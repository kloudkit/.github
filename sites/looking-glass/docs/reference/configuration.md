---
description: "Every Looking Glass setting, as a flag or an environment variable, and the request headers and params that shape a response."
---

# Configuration

Every setting has a flag and an environment variable; the flag wins.
`looking-glass --help` lists them, and `looking-glass --version` prints the version
*(`dev` for a build without a release tag)*.

## Settings

| Flag                         | Variable           | Default        | Description                                             |
| ---------------------------- | ------------------ | -------------- | ------------------------------------------------------- |
| `-p`, `--port PORT`          | `PORT`             | `8080`         | Port to listen on, on every interface.                  |
| `--max-body BYTES`           | `MAX_BODY_BYTES`   | `1048576`      | Body bytes reflected before the body is cut off.        |
| `--max-delay DURATION`       | `MAX_DELAY`        | `10s`          | Longest `X-Glass-Delay` a request may ask for.          |
| `--max-ws-duration DURATION` | `MAX_WS_DURATION`  | `1m`           | Longest a WebSocket stays open.                         |
| `--cors-credentials`         | `CORS_CREDENTIALS` | off            | Let cross-origin pages send cookies and read them back. |
| `--trusted-proxies LIST`     | `TRUSTED_PROXIES`  | private ranges | Proxies whose `X-Forwarded-For` is believed.            |

- **Sizes and durations:** `--max-body` and `--max-ws-duration` must be positive, and
  `--max-delay` can't be negative.
  Durations are Go durations *(`1m`, `90s`)*.
  A `MAX_BODY_BYTES`, `MAX_DELAY` or `MAX_WS_DURATION` that doesn't parse is ignored, and the
  default applies.
- **Credentials:** `CORS_CREDENTIALS` takes `true` or `1`.
  See [Cross-Origin Requests](../guide/cross-origin-requests#credentials) before you turn it
  on.

### Trusted Proxies

`--trusted-proxies` takes IPs and CIDRs, comma-separated.
Looking Glass reads `X-Forwarded-For` from the right, past every trusted address, and the
first one that isn't trusted is the client.
A request from an address that isn't trusted is its own client, whatever it forwards, so a
caller can't pick the address that's logged.

The default is the private and loopback ranges *(`10.0.0.0/8`, `172.16.0.0/12`,
`192.168.0.0/16`, `127.0.0.0/8`, `fc00::/7`, `::1/128`)*, where a reverse proxy in front of
Looking Glass sits.

```sh
# trust only the ingress
docker run --rm -p 8080:8080 -e TRUSTED_PROXIES=10.52.0.0/16 ghcr.io/kloudkit/looking-glass:latest

# trust nothing: the client is always the direct peer
docker run --rm -p 8080:8080 -e TRUSTED_PROXIES= ghcr.io/kloudkit/looking-glass:latest
```

A value that isn't an IP or a CIDR stops Looking Glass at startup.

```sh
docker run --rm -p 9000:9000 -e PORT=9000 -e MAX_BODY_BYTES=65536 \
  ghcr.io/kloudkit/looking-glass:latest
```

## Request Options

Each option is a header, or a query param for clients that can't set one; the header wins.

| Header             | Query param      | Values               | Effect                                        |
| ------------------ | ---------------- | -------------------- | --------------------------------------------- |
| `X-Glass-Format`   | `format`         | `html` / `json`      | Response format. Anything but `json` is HTML. |
| `X-Glass-Status`   | `glass-status`   | `200` to `599`       | Response status. Defaults to `200`.           |
| `X-Glass-Delay`    | `glass-delay`    | `0` to `--max-delay` | Wait before answering *(`1.5s`, `1.5`)*.      |
| `X-Glass-Encoding` | `glass-encoding` | `gzip` / `deflate`   | Compress the response.                        |

A bad status, delay or encoding is answered with `400` and the reason.

## Shutdown

On `SIGTERM` or `SIGINT`, Looking Glass stops accepting connections and gives requests in
flight 5 seconds to finish.
Requests waiting on a delay are answered at once, and open WebSockets are closed with `1001`.

## Protocols

Looking Glass speaks HTTP/1.1, and HTTP/2 without TLS for clients and proxies that start in
HTTP/2 *(`curl --http2-prior-knowledge`)*.
`proto` shows the protocol of the last hop, so behind a proxy that speaks HTTP/1.1 to its
backends it reads `HTTP/1.1`, whatever the browser used.
There's no TLS, so no HTTP/3; put Looking Glass behind a proxy that terminates it.
