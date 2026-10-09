import { describe, expect, test } from 'claude-code/testing'

import { bar, parseDf, parseIoreg, parseNetstat, parsePmset, parsePs, parseTop, rate, sparkline, toBytes, truncate } from './parse'

const TOP = `Processes: 974 total, 5 running, 969 sleeping, 6703 threads
2026/10/09 11:15:53
Load Avg: 5.33, 6.39, 4.94
CPU usage: 3.00% user, 3.00% sys, 94.00% idle
PhysMem: 23G used (3487M wired, 11G compressor), 164M unused.
Networks: packets: 44083401/66G in, 24548442/39G out.
Disks: 233262193/4440G read, 67907469/1275G written.

Processes: 975 total, 4 running, 971 sleeping, 6710 threads
2026/10/09 11:15:54
Load Avg: 5.10, 6.30, 4.90
CPU usage: 20.45% user, 20.68% sys, 58.85% idle
PhysMem: 22G used (3500M wired, 10G compressor), 1024M unused.
Networks: packets: 44083500/67G in, 24548500/40G out.
Disks: 233262300/4441G read, 67907500/1276G written.
`

describe('toBytes', () => {
  test('converts top units', () => {
    expect(toBytes('164M')).toBe(164 * 1024 ** 2)
    expect(toBytes('23G')).toBe(23 * 1024 ** 3)
    expect(toBytes('512K')).toBe(512 * 1024)
    expect(toBytes('2T')).toBe(2 * 1024 ** 4)
    expect(toBytes('100B')).toBe(100)
    expect(toBytes('100')).toBe(100)
  })
})

describe('parseTop', () => {
  test('reads the last sample', () => {
    const t = parseTop(TOP)!
    expect(t.cpu).toEqual({ user: 20.45, sys: 20.68, idle: 58.85 })
    expect(t.load).toEqual([5.1, 6.3, 4.9])
    expect(t.procs).toBe(975)
    expect(t.threads).toBe(6710)
    expect(t.mem.used).toBe(22 * 1024 ** 3)
    expect(t.mem.wired).toBe(3500 * 1024 ** 2)
    expect(t.mem.compressed).toBe(10 * 1024 ** 3)
    expect(t.mem.free).toBe(1024 * 1024 ** 2)
    expect(t.net).toEqual({ in: 67 * 1024 ** 3, out: 40 * 1024 ** 3 })
    expect(t.disk).toEqual({ read: 4441 * 1024 ** 3, written: 1276 * 1024 ** 3 })
  })

  test('returns undefined on junk', () => {
    expect(parseTop('nothing here')).toBeUndefined()
  })
})

describe('parsePs', () => {
  test('reads rows, skips header, keeps names with spaces', () => {
    const out = `  PID  %CPU    RSS COMM
  123  98.5  20480 yes
  456   1.2 102400 Google Chrome Helper
`
    expect(parsePs(out, 5)).toEqual([
      { pid: 123, cpu: 98.5, rss: 20480 * 1024, name: 'yes' },
      { pid: 456, cpu: 1.2, rss: 102400 * 1024, name: 'Google Chrome Helper' },
    ])
    expect(parsePs(out, 1).length).toBe(1)
  })

  test('with ppid, drops the sampler processes the mod itself spawned', () => {
    const out = `  PID  PPID  %CPU    RSS COMM
75208   900  96.6   8720 top
  412     1  46.6 222000 WindowServer
  777   555  10.0   1000 top
`
    expect(parsePs(out, 5, 900)).toEqual([
      { pid: 412, cpu: 46.6, rss: 222000 * 1024, name: 'WindowServer' },
      { pid: 777, cpu: 10, rss: 1000 * 1024, name: 'top' },
    ])
  })
})

describe('parsePmset', () => {
  test('reads a charged battery on AC', () => {
    const out = `Now drawing from 'AC Power'
 -InternalBattery-0 (id=23003235)\t100%; charged; 0:00 remaining present: true
`
    expect(parsePmset(out)).toEqual({ source: 'AC Power', percent: 100, state: 'charged', remaining: '0:00' })
  })

  test('reads a discharging battery with unknown time', () => {
    const out = `Now drawing from 'Battery Power'
 -InternalBattery-0 (id=1)\t57%; discharging; (no estimate) present: true
`
    expect(parsePmset(out)).toEqual({ source: 'Battery Power', percent: 57, state: 'discharging', remaining: undefined })
  })

  test('desktop without battery', () => {
    expect(parsePmset(`Now drawing from 'AC Power'\n`)).toEqual({ source: 'AC Power', percent: undefined, state: undefined, remaining: undefined })
  })
})

describe('parseDf', () => {
  test('reads the root volume', () => {
    const out = `Filesystem 1024-blocks Used Available Capacity iused ifree %iused Mounted on
/dev/disk3s1s1  1948455240   12342700 394205636     4%  458732 3942056360    0%   /
`
    expect(parseDf(out)).toEqual({ total: 1948455240 * 1024, used: 12342700 * 1024, available: 394205636 * 1024 })
  })
})

describe('helpers', () => {
  test('rate is bytes per second, never negative', () => {
    expect(rate(1000, 3000, 2000)).toBe(1000)
    expect(rate(5000, 1000, 1000)).toBe(0)
    expect(rate(0, 100, 0)).toBe(0)
  })

  test('sparkline maps 0..100 to blocks', () => {
    expect(sparkline([0, 50, 100])).toBe('▁▅█')
    expect(sparkline([])).toBe('')
  })

  test('bar fills proportionally and clamps', () => {
    expect(bar(50, 10)).toBe('█████░░░░░')
    expect(bar(150, 4)).toBe('████')
    expect(bar(-5, 4)).toBe('░░░░')
  })
})

describe('parseNetstat', () => {
  test('sums link-level bytes, skipping loopback and rows without an address', () => {
    const out = `Name       Mtu   Network       Address            Ipkts Ierrs     Ibytes    Opkts Oerrs     Obytes  Coll
lo0        16384 <Link#1>                       4510683     0 31602019854  4510683     0 31602019854     0
gif0*      1280  <Link#2>                             0     0          0        0     0          0     0
en0        1500  <Link#11>   aa:bb:cc:dd:ee:ff  1000     0    5000000      900     0    2000000     0
en0        1500  192.168.1     192.168.1.20      1000     -    5000000      900     -    2000000     -
utun3      1380  <Link#20>                          10     0       3000       10     0       1000     0
`
    expect(parseNetstat(out)).toEqual({ in: 5003000, out: 2001000 })
  })
})

describe('parseIoreg', () => {
  test('sums bytes read and written over every drive', () => {
    const out = `      "Statistics" = {"Operations (Write)"=68025011,"Bytes (Read)"=4682273239040,"Bytes (Write)"=1370012692480}
      "Statistics" = {"Operations (Write)"=0,"Bytes (Read)"=8229198848,"Bytes (Write)"=0}
`
    expect(parseIoreg(out)).toEqual({ read: 4682273239040 + 8229198848, written: 1370012692480 })
  })

  test('undefined when there are no statistics', () => {
    expect(parseIoreg('')).toBeUndefined()
  })
})

describe('display helpers', () => {
  test('auto-scaled sparkline spreads a narrow range over all blocks', () => {
    expect(sparkline([95, 95.5, 96], true)).toBe('▁▅█')
    expect(sparkline([96, 96, 96], true)).toBe('▄▄▄')
  })

  test('truncate keeps short text and ellipsizes long text', () => {
    expect(truncate('node', 10)).toBe('node')
    expect(truncate('com.apple.Virtualization.VirtualMachine', 12)).toBe('com.apple.V…')
  })
})
