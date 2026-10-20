---
description: "Send Looking Glass a compressed body and see it decoded, or ask for a compressed response to test a proxy or a client."
---

# Compression

Looking Glass decodes a compressed request body, so you can read it, and compresses its
response when you ask, so you can see whether a proxy or a client decodes it.

## At a Glance

- Looking Glass running *(see [Getting Started](./getting-started))*.
- `gzip` or `deflate`; Looking Glass handles nothing else.

## Compressed Requests

A body sent with `Content-Encoding: gzip` or `deflate` is reflected decoded, and parsed like
any other body:

```sh
echo '{"name":"ada"}' | gzip | curl 'localhost:8080/api' --data-binary @- \
  -H 'Content-Encoding: gzip' -H 'Content-Type: application/json' -H 'X-Glass-Format: json'
```

```json
{
  "body": "{\"name\":\"ada\"}\n",
  "contentEncoding": "gzip",
  "json": { "name": "ada" },
  ...
}
```

- **Bounded:** decoding stops at the body limit, so a small upload can't expand past it.
  A decoded body that reaches the limit is cut off as usual.
- **Left as is:** a body that doesn't decode, or uses another encoding *(`br`, `zstd`)*, is
  reflected as it arrived, and `contentEncoding` stays empty.

## Compressed Responses

`X-Glass-Encoding` *(or `glass-encoding`)* compresses the response with `gzip` or `deflate`,
whatever the request's `Accept-Encoding` says:

```sh
curl -si 'localhost:8080/?glass-encoding=gzip' | head -5
```

The response carries `Content-Encoding` and `Vary: Accept-Encoding`.
Nothing is compressed unless you ask, so by default you see exactly what a client gets
without one.

::: tip
A proxy can undo it.
Traefik, like any proxy built on Go's HTTP client, adds `Accept-Encoding: gzip` when the client
didn't send one, then decompresses the answer and drops its `Content-Encoding`.
Send `Accept-Encoding: gzip` yourself *(`curl --compressed`)* to see the compressed response
come through.
:::

Any other value is answered with `400`.

## Next Steps

- [Response Formats](./response-formats#bodies): how bodies are cut off and parsed.
- [Configuration](../reference/configuration#request-options): every request option.
