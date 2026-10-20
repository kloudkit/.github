---
description: "Read Looking Glass's activity log: one colored line per request, without the request's contents."
---

# Activity Log

Looking Glass prints one line per request to stderr, so `docker logs` reads like an access
log.
The line never includes headers or bodies, so secrets in requests don't end up in your logs.

## At a Glance

- Looking Glass running *(see [Getting Started](./getting-started))*.
- Access to its output: `docker logs`, or the terminal it runs in.

## Read the Log

```sh
docker logs -f <container>
```

```text
2026/06/10 12:00:00 10.0.0.1  POST  /api/users?page=2  →  html  200  14b
```

Each line has the time, the client address, the method, the path, the format and status of
the response, and the size of the body.
A body that was cut off shows a `+` after its size *(`5242880b+`)*.

- **Behind a proxy:** the client comes from `X-Forwarded-For`, read only from a trusted
  proxy *(see [Configuration](../reference/configuration#trusted-proxies))*.
- **Not reflected:** a CORS preflight logs `preflight` as its format, and a bad
  `X-Glass-Status`, `X-Glass-Delay` or `X-Glass-Encoding` logs `error`.
- **Client gone:** a client that hangs up during a delay logs `499`.

The line is written once the response is sent, so a delayed request shows up when it's
answered.

## WebSockets

A WebSocket logs a line when it opens, and another when it closes, with its close code, how
long it was open, and the messages it received and sent:

```text
2026/06/10 12:00:00 10.0.0.1  GET  /live  →  ws  101  0b
2026/06/10 12:00:42 10.0.0.1  GET  /live  →  ws closed  1000  42.1s  3 in  4 out
```

The first message, the reflection, counts as one out.

The request side is lavender and the response side yellow, as in the logo.
The colors are always written, so a log collector stores the ANSI escape codes along with the
text.

Looking Glass also logs one line when it starts, with its port and body limit, and
`shutting down` when it stops.

## Safe to Log

Control characters are removed from the path and the client before they're logged, so a
request can't break the log's lines or inject terminal escape codes.

## Next Steps

- [Response Formats](./response-formats): what the client gets back.
- [Configuration](../reference/configuration): change the port and the body limit.
