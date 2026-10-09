import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { History, Snapshot } from '../types'
import { bar, fmtBytes, parseDf, parseIoreg, parseNetstat, parsePmset, parsePs, parseTop, rate, sparkline, truncate } from './parse'

const PANE = 'sysmon'
const TITLE = 'System Monitor'
const EVERY_MS = 3000
const HISTORY = 60

const snapshot = atom({ plugin: 'sysmon', key: 'snapshot' } as const, null as Snapshot | null)
const history = atom({ plugin: 'sysmon', key: 'history' } as const, { cpu: [], mem: [] } as History)


// Cumulative counters from the previous tick, for rates. Reset on reload.
let prev: { at: number; netIn: number; netOut: number; read: number; written: number } | undefined
let totalMem = 0
let selfPid: number | undefined
let busy = false

async function run($: EngineInterface, argv: string[]): Promise<string | undefined> {
  try {
    const { exitCode, stdout } = await $.process.run(argv, { timeoutMs: 10_000 })
    return exitCode === 0 ? stdout : undefined
  } catch {
    return undefined
  }
}

async function tick($: EngineInterface) {
  if (busy) return
  busy = true
  try {
    if (!totalMem) totalMem = Number((await run($, ['sysctl', '-n', 'hw.memsize']))?.trim()) || 0
    // The parent of a spawned shell is the engine, which also spawns top and ps.
    if (selfPid === undefined) selfPid = Number((await run($, ['sh', '-c', 'echo $PPID']))?.trim()) || undefined

    const [topOut, psOut, battOut, dfOut, netOut, ioOut] = await Promise.all([
      run($, ['top', '-l', '2', '-n', '0', '-s', '1']),
      run($, ['ps', '-Aceo', 'pid,ppid,pcpu,rss,comm', '-r']),
      run($, ['pmset', '-g', 'batt']),
      run($, ['df', '-k', '/']),
      run($, ['netstat', '-ibn']),
      run($, ['ioreg', '-c', 'IOBlockStorageDriver', '-r', '-w0', '-d', '1']),
    ])
    const at = await $.clock.now()
    const t = topOut ? parseTop(topOut) : undefined
    const batt = battOut ? parsePmset(battOut) : undefined
    const df = dfOut ? parseDf(dfOut) : undefined
    // Exact byte counters; top's are rounded to whole gigabytes.
    const net = netOut ? parseNetstat(netOut) : t?.net
    const io = (ioOut ? parseIoreg(ioOut) : undefined) ?? t?.disk

    const snap: Snapshot = { at, top: psOut ? parsePs(psOut, 40, selfPid) : [] }
    if (t) {
      snap.cpu = t.cpu
      snap.load = t.load
      snap.procs = t.procs
      snap.threads = t.threads
      snap.mem = { total: totalMem || t.mem.used + t.mem.free, ...t.mem }
    }
    if (net && io) {
      if (prev) {
        const ms = at - prev.at
        snap.net = { inPerSec: rate(prev.netIn, net.in, ms), outPerSec: rate(prev.netOut, net.out, ms) }
        snap.disk = { readPerSec: rate(prev.read, io.read, ms), writePerSec: rate(prev.written, io.written, ms) }
      }
      prev = { at, netIn: net.in, netOut: net.out, read: io.read, written: io.written }
    }
    if (df) snap.disk = { readPerSec: 0, writePerSec: 0, ...snap.disk, ...df }
    if (batt) snap.battery = batt

    await update($, snapshot, () => snap)
    if (t) {
      const cpuPct = 100 - t.cpu.idle
      const memPct = snap.mem ? (snap.mem.used / snap.mem.total) * 100 : 0
      const battery = snap.battery?.percent !== undefined ? ` · Batt ${snap.battery.percent}%` : ''
      $.ui.status(`CPU ${cpuPct.toFixed(0)}% · Mem ${memPct.toFixed(0)}% · Load ${t.load[0].toFixed(2)}${battery}`)
      await update($, history, h => ({
        cpu: [...h.cpu, cpuPct].slice(-HISTORY),
        mem: [...h.mem, memPct].slice(-HISTORY),
      }))
    }
  } finally {
    busy = false
  }
}

const level = (pct: number) => (pct >= 85 ? 'error' : pct >= 60 ? 'warning' : 'success')
const pct = (n: number) => `${n.toFixed(1)}%`
const lpad = (s: string, n: number) => (s.length >= n ? s : ' '.repeat(n - s.length) + s)

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'sysmon', description: 'Open the System Monitor pane (CPU, memory, disk, network, battery, processes)' })
    void tick($)
    $.clock.every(EVERY_MS, () => void tick($))
    return next(e)
  })

  on('command.run', { command: 'sysmon' }, async $ => {
    await tick($)
    const opened = await $.ui.open({ id: PANE, title: TITLE, focus: true })
    return { text: opened.isPlaced ? 'System Monitor opened.' : `System Monitor is open but not drawn: ${opened.reason}` }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const s = await read($, snapshot)
    const hist = await read($, history)
    // The pane's own body width, not the terminal's, so rows never wrap.
    const cols = e.props.bodyColumns || e.viewport?.columns || 60
    const rows = e.viewport?.rows ?? 30
    const barW = Math.max(8, Math.min(30, cols - 30))
    const sparkW = Math.max(8, cols - 6)

    if (!s) return <Text dimColor>Sampling…</Text>

    const head = (label: string) => <Text bold color="claude">{label}</Text>
    const na = <Text dimColor>  unavailable</Text>

    const cpuPct = s.cpu ? 100 - s.cpu.idle : 0
    const memPct = s.mem ? (s.mem.used / s.mem.total) * 100 : 0
    // From free space: on APFS, df's used for / counts only the system volume.
    const diskPct = s.disk?.total ? ((s.disk.total - (s.disk.available ?? 0)) / s.disk.total) * 100 : 0

    // Fixed sections take about 20 rows; the rest goes to processes.
    const procRows = Math.max(3, rows - 24)

    return (
      <Box flexDirection="column">
        {head('CPU')}
        {s.cpu ? (
          <Box flexDirection="column">
            <Text>
              {'  '}<Text color={level(cpuPct)}>{bar(cpuPct, barW)}</Text> {pct(cpuPct)}
            </Text>
            <Text dimColor>
              {'  '}user {pct(s.cpu.user)}  sys {pct(s.cpu.sys)}  idle {pct(s.cpu.idle)}
            </Text>
            <Text dimColor>
              {'  '}load {s.load?.map(n => n.toFixed(2)).join(' ')}  ·  {s.procs} procs, {s.threads} threads
            </Text>
            <Text color="subtle">{'  '}{sparkline(hist.cpu.slice(-sparkW))}</Text>
          </Box>
        ) : na}

        {head('Memory')}
        {s.mem ? (
          <Box flexDirection="column">
            <Text>
              {'  '}<Text color={level(memPct)}>{bar(memPct, barW)}</Text> {fmtBytes(s.mem.used)} / {fmtBytes(s.mem.total)}
            </Text>
            <Text dimColor>
              {'  '}wired {fmtBytes(s.mem.wired)}  compressed {fmtBytes(s.mem.compressed)}  free {fmtBytes(s.mem.free)}
            </Text>
            <Text color="subtle">{'  '}{sparkline(hist.mem.slice(-sparkW), true)}</Text>
          </Box>
        ) : na}

        {head('Disk')}
        {s.disk ? (
          <Box flexDirection="column">
            {s.disk.total ? (
              <Text>
                {'  '}<Text color={level(diskPct)}>{bar(diskPct, barW)}</Text> {fmtBytes(s.disk.available ?? 0)} free of {fmtBytes(s.disk.total)}
              </Text>
            ) : null}
            <Text dimColor>
              {'  '}read {fmtBytes(s.disk.readPerSec)}/s  write {fmtBytes(s.disk.writePerSec)}/s
            </Text>
          </Box>
        ) : na}

        {head('Network')}
        {s.net ? (
          <Text dimColor>
            {'  '}in {fmtBytes(s.net.inPerSec)}/s  out {fmtBytes(s.net.outPerSec)}/s
          </Text>
        ) : <Text dimColor>  measuring…</Text>}

        {head('Energy')}
        {s.battery?.percent !== undefined ? (
          <Text>
            {'  '}<Text color={s.battery.percent <= 20 ? 'error' : 'success'}>{bar(s.battery.percent, Math.min(10, barW))}</Text>{' '}
            {s.battery.percent}% · {s.battery.state} · {s.battery.source}
            {s.battery.remaining && s.battery.remaining !== '0:00' ? ` · ${s.battery.remaining} left` : ''}
          </Text>
        ) : (
          <Text dimColor>  {s.battery?.source ?? 'no battery'}</Text>
        )}

        {head('Processes')}
        <Text dimColor>{'  '}{lpad('PID', 6)}  {lpad('%CPU', 6)}  {lpad('MEM', 8)}  NAME</Text>
        {s.top.slice(0, procRows).map(p => (
          <Text color={p.cpu >= 50 ? 'warning' : undefined} wrap="truncate-end">
            {'  '}{lpad(String(p.pid), 6)}  {lpad(p.cpu.toFixed(1), 6)}  {lpad(fmtBytes(p.rss), 8)}  {truncate(p.name, Math.max(8, cols - 29))}
          </Text>
        ))}
      </Box>
    )
  })
}
