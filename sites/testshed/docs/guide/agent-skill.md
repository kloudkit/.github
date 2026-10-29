---
description: "Install the TestShed Agent Skill so Claude Code, Codex, Cursor and other coding agents write TestShed tests the way this guide does."
---

# Agent Skill

The TestShed skill teaches a coding agent how to write, fix and review tests with TestShed.
It follows the open Agent Skills format, so any agent that reads skills picks it up.

## At a Glance

- A coding agent that reads Agent Skills *(Claude Code, Codex, Cursor, OpenCode, Gemini CLI and
  others)*.
- `npx skills` needs Node.js 22.20 or later.

## Install the Skill

::: code-group

```sh [skills CLI]
npx skills add kloudkit/testshed
```

```text [Claude Code]
/plugin marketplace add kloudkit/testshed
/plugin install testshed@testshed
```

:::

`npx skills add` asks which agents to install it for; `-a claude-code` picks one and `-g`
installs it for every project.
To install by hand, copy
[`skills/testshed`](https://github.com/kloudkit/testshed/tree/main/skills/testshed) into the
directory your agent loads skills from.

## What the Agent Learns

The agent loads the skill when a task touches TestShed: a pytest config with `--shed`, a test
using `shed` or a sidecar, or a request to add container tests to a project.
It then:

- **Reads the setup first:** your `addopts`, `conftest.py` defaults and wrapper fixtures, and
  the stubs directory.
- **Picks the fixture:** the shared `shed` for checks, a marker when the test changes the
  container, `shed_deferred` and sidecars for dependencies.
- **Waits with probes:** no `sleep`, and a `LogProbe` before asserting on a later log line.
- **Avoids the traps:** default `envs` dropped by markers, read-only mounts, unquoted list
  commands, `detach=False` raising instead of failing.
- **Runs what it writes:** and says so when Docker isn't reachable, instead of reporting a pass.

The skill's detail pages load only when the agent needs them, so it stays cheap to keep
installed.

## Without the Skill

Point the agent at the docs instead.
[`llms.txt`](https://testshed.kloudkit.com/llms.txt) lists every page with a link to its raw
Markdown, and [`llms-full.txt`](https://testshed.kloudkit.com/llms-full.txt) holds them all
in one file.

## Next Steps

- [Containers](./containers): the fixtures and markers the skill chooses between.
- [Readiness Probes](./readiness-probes): how the agent waits for a container.
- [Fixtures and Markers](../reference/fixtures): everything the skill can reach for.
