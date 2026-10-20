---
description: "Every field of the JSON document Looking Glass returns for a request."
---

# JSON Response

With `X-Glass-Format: json` *(or `?format=json`)*, Looking Glass returns this document as
`application/json`, with status `200` unless the request asked for another *(see
[Status and Delay](../guide/status-and-delay))*.

| Field             | Type                    | Description                                                          |
| ----------------- | ----------------------- | -------------------------------------------------------------------- |
| `method`          | string                  | Request method.                                                      |
| `uri`             | string                  | Path and query, as sent.                                             |
| `proto`           | string                  | Protocol version *(`HTTP/1.1`)*.                                     |
| `time`            | string                  | When the request arrived, in UTC *(RFC 3339)*.                       |
| `remote`          | string                  | Address and port of the direct client *(a proxy, if there is one)*.  |
| `client`          | string                  | The client behind any trusted proxies, else `remote` without a port. |
| `host`            | string                  | The `Host` the client asked for.                                     |
| `server`          | string                  | Hostname of the Looking Glass that answered.                         |
| `query`           | object of string arrays | Query parameters, each with every value it was sent with.            |
| `headers`         | object of string arrays | Request headers, without `Host`.                                     |
| `body`            | string                  | The body, up to the body limit.                                      |
| `bodyEncoding`    | string                  | `utf-8`, or `base64` for a body that isn't valid UTF-8.              |
| `contentEncoding` | string                  | `gzip` or `deflate` when the body was decompressed, else empty.      |
| `bodyBytes`       | number                  | Size of the body; when cut off, its `Content-Length` if it had one.  |
| `truncated`       | boolean                 | Whether the body was longer than the limit and was cut off.          |
| `json`            | any                     | The body as JSON, or `null` when it isn't JSON or was cut off.       |
| `form`            | object of string arrays | Form fields of a urlencoded or multipart body, else `null`.          |
| `files`           | object of file arrays   | Multipart uploads, else `null`.                                      |

Each file in `files` has a `filename`, a `contentType` and its size in `bytes`.
