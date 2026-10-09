# sysmon

A Claude Code mod that brings Activity Monitor into the terminal (macOS).

- **Status line**, always on: `CPU 35% · Mem 96% · Load 3.35 · Batt 100%`
- **`/sysmon`** opens a live pane, refreshed every 3 seconds:
  - **CPU**: usage bar, user / sys / idle, load average, process and thread
    counts, history sparkline
  - **Memory**: used / total, wired, compressed, free, history sparkline
  - **Disk**: free space on `/`, read and write rates
  - **Network**: in and out rates
  - **Energy**: battery level, charging state, power source, time remaining
  - **Processes**: the busiest processes by %CPU, sized to the pane

Bars turn yellow at 60% and red at 85%. The numbers come from built-in macOS
commands (`top`, `ps`, `netstat`, `ioreg`, `pmset`, `df`, `sysctl`); the
monitor leaves its own sampling commands out of the process list.

## Install

At a Claude Code prompt:

```text
/plugin install sysmon --marketplace jakegibs617/link-download-agent-skills
```

Answer `y` to add the marketplace and choose the user scope. Then run
`/sysmon`. If another pane is open, the System Monitor appears as a tab
beside it.

## Develop

```bash
claude plugin validate mods/sysmon   # manifest and hooks module
claude plugin test mods/sysmon       # parser and pane tests
claude --plugin-dir mods/sysmon      # run a session with this copy loaded
```

`hooks/parse.ts` holds the pure parsers, and `hooks/register.tsx` holds the
poller, the `/sysmon` command and the pane.
