---
description: "Open a WebSocket to Looking Glass: the handshake comes back as the first message, then every message is echoed."
---

# WebSockets

Any path takes a WebSocket.
The first message is the handshake's reflection, as JSON, and every message after it is
echoed back as it came, text or binary.
Use it to see what a client sends when it connects, and to check that a proxy passes
WebSockets through.

## At a Glance

- Looking Glass running *(see [Getting Started](./getting-started))*.
- A WebSocket client: [websocat](https://github.com/vi/websocat), wscat, or a browser.

## Connect

```sh
websocat 'ws://localhost:8080/live?room=1'
```

```text
{
  "method": "GET",
  "uri": "/live?room=1",
  "headers": {
    "Connection": ["Upgrade"],
    "Sec-Websocket-Key": ["dGhlIHNhbXBsZSBub25jZQ=="],
    "Upgrade": ["websocket"],
    ...
  },
  ...
}
hello
hello
```

The reflection is always JSON, since a socket has no HTML view.
From a page:

```js
const ws = new WebSocket('ws://localhost:8080/live')
ws.onmessage = (e) => console.log(e.data)
ws.onopen = () => ws.send('hello')
```

## Cookies

Browsers attach cookies to a WebSocket handshake from any page, and CORS doesn't apply to it.
So when the page's `Origin` isn't Looking Glass's own host, the reflection leaves out
`Cookie`, unless `--cors-credentials` is on *(see
[Cross-Origin Requests](./cross-origin-requests#credentials))*.
The connection itself is accepted from any origin.

## Limits

- **Message size:** a message larger than `--max-body` closes the socket with `1009`.
- **Lifetime:** a socket stays open at most `--max-ws-duration` *(`1m` by default)*, then
  closes with `1001`.
- **Shutdown:** every open socket is closed with `1001`.

## Status and Delay

`glass-status` with anything but `200` refuses the upgrade with that status, and the usual
reflection as the body, so a client can test a failed connect.
`glass-delay` waits before accepting.
The browser can't set headers on a WebSocket, so use the query params:

```js
new WebSocket('ws://localhost:8080/live?glass-status=503')
```

## Next Steps

- [Activity Log](./activity-log#websockets): the open and close lines.
- [Status and Delay](./status-and-delay): every option they take.
