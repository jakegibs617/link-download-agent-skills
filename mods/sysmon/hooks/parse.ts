// Pure parsers for the macOS commands sysmon polls. No `$` here, so tests can
// feed them captured output.

export type TopSample = {
  cpu: { user: number; sys: number; idle: number }
  load: [number, number, number]
  procs: number
  threads: number
  mem: { used: number; wired: number; compressed: number; free: number }
  net: { in: number; out: number }
  disk: { read: number; written: number }
}

export type Proc = { pid: number; cpu: number; rss: number; name: string }

export type Battery = {
  source: string | undefined
  percent: number | undefined
  state: string | undefined
  remaining: string | undefined
}

export type DiskSpace = { total: number; used: number; available: number }

const UNITS: Record<string, number> = { B: 1, K: 1024, M: 1024 ** 2, G: 1024 ** 3, T: 1024 ** 4, P: 1024 ** 5 }

/** "164M" -> bytes; top's units are binary. */
export function toBytes(s: string): number {
  const m = /^([\d.]+)\s*([BKMGTP])?$/i.exec(s.trim())
  if (!m) return NaN
  return Number(m[1]) * (UNITS[(m[2] ?? 'B').toUpperCase()] ?? 1)
}

const SIZE = '([\\d.]+[BKMGTP]?)'

/** Parses `top -l N -n 0`, keeping the last sample (the first one's CPU is bogus). */
export function parseTop(out: string): TopSample | undefined {
  const start = out.lastIndexOf('Processes:')
  if (start < 0) return undefined
  const s = out.slice(start)

  const procs = /Processes:\s*(\d+) total.*?(\d+) threads/.exec(s)
  const load = /Load Avg:\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(s)
  const cpu = /CPU usage:\s*([\d.]+)% user,\s*([\d.]+)% sys,\s*([\d.]+)% idle/.exec(s)
  const mem = new RegExp(`PhysMem:\\s*${SIZE} used \\(${SIZE} wired(?:,\\s*${SIZE} compressor)?\\),\\s*${SIZE} unused`).exec(s)
  const net = new RegExp(`Networks:.*?\\d+/${SIZE} in,\\s*\\d+/${SIZE} out`).exec(s)
  const disk = new RegExp(`Disks:\\s*\\d+/${SIZE} read,\\s*\\d+/${SIZE} written`).exec(s)
  if (!cpu || !mem) return undefined

  return {
    cpu: { user: Number(cpu[1]), sys: Number(cpu[2]), idle: Number(cpu[3]) },
    load: load ? [Number(load[1]), Number(load[2]), Number(load[3])] : [0, 0, 0],
    procs: procs ? Number(procs[1]) : 0,
    threads: procs ? Number(procs[2]) : 0,
    mem: {
      used: toBytes(mem[1]!),
      wired: toBytes(mem[2]!),
      compressed: mem[3] ? toBytes(mem[3]) : 0,
      free: toBytes(mem[4]!),
    },
    net: net ? { in: toBytes(net[1]!), out: toBytes(net[2]!) } : { in: 0, out: 0 },
    disk: disk ? { read: toBytes(disk[1]!), written: toBytes(disk[2]!) } : { read: 0, written: 0 },
  }
}

const SAMPLERS = new Set(['top', 'ps', 'pmset', 'df', 'sysctl', 'sh'])

/**
 * Parses `ps -Aceo pid,pcpu,rss,comm -r` (or with `ppid` after `pid`); RSS is
 * in KB. With a PPID column and `selfPid`, drops the sampler commands that
 * process spawned, so the monitor does not list itself.
 */
export function parsePs(out: string, limit: number, selfPid?: number): Proc[] {
  const hasPpid = /\bPPID\b/.test(out.split('\n', 1)[0] ?? '')
  const row = hasPpid
    ? /^\s*(\d+)\s+(\d+)\s+([\d.]+)\s+(\d+)\s+(.+?)\s*$/
    : /^\s*(\d+)\s+()([\d.]+)\s+(\d+)\s+(.+?)\s*$/
  const rows: Proc[] = []
  for (const line of out.split('\n')) {
    const m = row.exec(line)
    if (!m) continue
    const name = m[5]!
    if (hasPpid && selfPid !== undefined && Number(m[2]) === selfPid && SAMPLERS.has(name)) continue
    rows.push({ pid: Number(m[1]), cpu: Number(m[3]), rss: Number(m[4]) * 1024, name })
    if (rows.length >= limit) break
  }
  return rows
}

/** Parses `pmset -g batt`. */
export function parsePmset(out: string): Battery {
  const source = /drawing from '([^']+)'/.exec(out)?.[1]
  const batt = /(\d+)%;\s*([^;]+);\s*(\d+:\d+)?/.exec(out)
  return {
    source,
    percent: batt ? Number(batt[1]) : undefined,
    state: batt ? batt[2]!.trim() : undefined,
    remaining: batt?.[3],
  }
}

/**
 * Parses `netstat -ibn`: total bytes in and out over the link-level row of
 * each interface but loopback. Counted from the row's end, since the Address
 * column is empty for some interfaces.
 */
export function parseNetstat(out: string): { in: number; out: number } {
  let rx = 0
  let tx = 0
  for (const line of out.split('\n')) {
    if (!line.includes('<Link#')) continue
    const f = line.trim().split(/\s+/)
    if (f[0]!.replace('*', '') === 'lo0' || f.length < 8) continue
    rx += Number(f[f.length - 5]) || 0
    tx += Number(f[f.length - 2]) || 0
  }
  return { in: rx, out: tx }
}

/** Parses `ioreg -c IOBlockStorageDriver -r -w0 -d 1`: bytes over every drive. */
export function parseIoreg(out: string): { read: number; written: number } | undefined {
  const reads = [...out.matchAll(/"Bytes \(Read\)"=(\d+)/g)]
  if (reads.length === 0) return undefined
  const writes = [...out.matchAll(/"Bytes \(Write\)"=(\d+)/g)]
  const sum = (ms: RegExpMatchArray[]) => ms.reduce((n, m) => n + Number(m[1]), 0)
  return { read: sum(reads), written: sum(writes) }
}

/** Parses `df -k /`. */
export function parseDf(out: string): DiskSpace | undefined {
  const line = out.trim().split('\n').at(-1) ?? ''
  const m = /^\S.*?\s+(\d+)\s+(\d+)\s+(\d+)\s+\d+%/.exec(line)
  if (!m) return undefined
  return { total: Number(m[1]) * 1024, used: Number(m[2]) * 1024, available: Number(m[3]) * 1024 }
}

/** Bytes per second between two cumulative counters. */
export function rate(prev: number, cur: number, ms: number): number {
  if (ms <= 0) return 0
  return Math.max(0, ((cur - prev) / ms) * 1000)
}

const BLOCKS = '▁▂▃▄▅▆▇█'

/**
 * Percentages (0..100) as a row of block characters; `auto` scales the row
 * to its own min..max so small changes near the top still show.
 */
export function sparkline(values: readonly number[], auto = false): string {
  const lo = auto ? Math.min(...values) : 0
  const hi = auto ? Math.max(...values) : 100
  const top = BLOCKS.length - 1
  return values
    .map(v => {
      if (hi - lo < 1e-9) return BLOCKS[Math.floor(top / 2)]
      return BLOCKS[Math.round(((Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo)) * top)]
    })
    .join('')
}

/** Cuts `s` to `width` cells, ending in an ellipsis when cut. */
export function truncate(s: string, width: number): string {
  return s.length <= width ? s : s.slice(0, Math.max(0, width - 1)) + '…'
}

/** A `width`-cell bar filled to `percent`. */
export function bar(percent: number, width: number): string {
  const filled = Math.round((Math.min(100, Math.max(0, percent)) / 100) * width)
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

/** 1536 -> "1.5 KB". */
export function fmtBytes(n: number): string {
  if (!Number.isFinite(n)) return '—'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024
    i++
  }
  return `${n >= 100 || i === 0 ? n.toFixed(0) : n.toFixed(1)} ${units[i]}`
}
