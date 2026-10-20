---
description: "Run Looking Glass and send it a request to see exactly what arrived: method, URL, headers and body."
---

# Getting Started

Looking Glass answers every request with the request itself: method, URL, query, headers,
client address and body.
Point a webhook, a proxy or a client at it to see what it really sends.

## At a Glance

- Docker, on `amd64` or `arm64`, or Go 1.27.2 or later to run it without a container.
- A free port; the examples use `8080`.

## Run It

::: code-group

```sh [docker]
docker run --rm -p 8080:8080 ghcr.io/kloudkit/looking-glass:latest
```

```yaml [compose]
services:
  looking-glass:
    image: ghcr.io/kloudkit/looking-glass:latest
    ports:
      - 8080:8080
```

```sh [go]
go install github.com/kloudkit/looking-glass@latest
looking-glass
```

:::

Images are tagged `latest`, `vX.Y.Z` and `vX.Y`; pin a version for anything that has to stay
put.

## Send a Request

Any method on any path gets a `200` with the request reflected back:

```sh
curl 'localhost:8080/api/users?page=2' -d '{"name":"ada"}' \
  -H 'Content-Type: application/json' -H 'X-Glass-Format: json'
```

```json
{
  "method": "POST",
  "uri": "/api/users?page=2",
  "proto": "HTTP/1.1",
  "time": "2026-10-14T09:30:00Z",
  "remote": "172.17.0.1:54321",
  "client": "172.17.0.1",
  "host": "localhost:8080",
  "server": "3f2a9c1d7e4b",
  "query": { "page": ["2"] },
  "headers": {
    "Accept": ["*/*"],
    "Content-Length": ["14"],
    "Content-Type": ["application/json"],
    "User-Agent": ["curl/8.5.0"],
    "X-Glass-Format": ["json"]
  },
  "body": "{\"name\":\"ada\"}",
  "bodyEncoding": "utf-8",
  "contentEncoding": "",
  "bodyBytes": 14,
  "truncated": false,
  "json": { "name": "ada" },
  "form": null,
  "files": null
}
```

Open the same URL in a browser for the HTML view.

## Next Steps

- [Response Formats](./response-formats): HTML or JSON, and copying a request.
- [Status and Delay](./status-and-delay): answer with another status, or slowly.
- [Activity Log](./activity-log): what the container prints for each request.
- [Configuration](../reference/configuration): the port and the body limit.
