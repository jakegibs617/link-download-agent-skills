export type ProcRow = { pid: number; cpu: number; rss: number; name: string }

export type Snapshot = {
  at: number
  cpu?: { user: number; sys: number; idle: number }
  load?: [number, number, number]
  procs?: number
  threads?: number
  mem?: { total: number; used: number; wired: number; compressed: number; free: number }
  net?: { inPerSec: number; outPerSec: number }
  disk?: { readPerSec: number; writePerSec: number; total?: number; used?: number; available?: number }
  battery?: { source?: string; percent?: number; state?: string; remaining?: string }
  top: ProcRow[]
}

export type History = { cpu: number[]; mem: number[] }

declare module 'claude-code' {
  interface PluginState {
    sysmon: { snapshot: Snapshot | null; history: History }
  }
}
