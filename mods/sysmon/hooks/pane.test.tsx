import { expect, mock, test } from 'claude-code/testing'

const PANE = {
  component: 'Pane',
  requestId: 'sysmon',
  props: { title: 'System Monitor', isFocused: false, bodyColumns: 78, placement: 'dock' } as any,
  viewport: { columns: 80, rows: 40 },
} as const

const OUT: Record<string, string> = {
  sysctl: '25769803776\n',
  sh: '900\n',
  top: `Processes: 975 total, 4 running, 971 sleeping, 6710 threads
Load Avg: 3.35, 4.04, 4.26
CPU usage: 20.00% user, 15.00% sys, 65.00% idle
PhysMem: 23G used (3453M wired, 11G compressor), 81M unused.
Networks: packets: 1/67G in, 1/40G out.
Disks: 1/4441G read, 1/1276G written.
`,
  ps: `  PID  PPID  %CPU    RSS COMM
75208   900  96.6   8720 top
  412     1  46.6 222000 WindowServer
`,
  pmset: `Now drawing from 'AC Power'\n -InternalBattery-0 (id=1)\t100%; charged; 0:00 remaining present: true\n`,
  df: `Filesystem 1024-blocks Used Available Capacity iused ifree %iused Mounted on
/dev/disk3s1s1  1948455240   12342700 394205636     4%  458732 3942056360    0%   /
`,
}

test('pane draws on the terminal before the first sample', async $ => {
  const ui = await $.ui.mount({ plugin: 'sysmon', surface: 'terminal', ...PANE })
  expect(await ui.find({ type: 'Text', text: /Sampling/ })).toBeDefined()
  await ui.unmount()
})

test('/sysmon samples, opens, and the pane draws every section without itself', async ($, on) => {
  mock.clock(on)
  on('process.run', async (_$, e) => ({
    value: { exitCode: 0, stdout: OUT[e.argv[0]!] ?? '', stderr: '', isStdoutTruncated: false, isStderrTruncated: false },
  }))
  on('ui.open', async () => ({ value: { isPlaced: true as const } }))

  const ran = await $.command.run({ command: 'sysmon', args: '' } as any)
  expect((ran as any).text).toBe('System Monitor opened.')

  const ui = await $.ui.mount({ plugin: 'sysmon', surface: 'terminal', ...PANE })
  for (const label of ['CPU', 'Memory', 'Disk', 'Network', 'Energy', 'Processes', /WindowServer/, /100%/]) {
    expect(await ui.find({ type: 'Text', text: label })).toBeDefined()
  }
  expect(await ui.find({ type: 'Text', text: /\btop\s*$/ })).toBeUndefined()
  await ui.unmount()
})
