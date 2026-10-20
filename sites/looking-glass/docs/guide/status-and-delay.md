---
description: "Make Looking Glass answer with any status, or after a delay, to see how a proxy or a client handles it."
---

# Status and Delay

Looking Glass answers `200` straight away, unless the request asks for something else.
Ask for a `503` or a slow answer to see how a proxy, a retry loop or a timeout really
behaves.

## At a Glance

- Looking Glass running *(see [Getting Started](./getting-started))*.
- The `X-Glass-Status` and `X-Glass-Delay` headers, or the `glass-status` and `glass-delay`
  query params.

## Pick a Status

```sh
curl -i 'localhost:8080/checkout' -H 'X-Glass-Status: 503'
```

Any status from `200` to `599` works, and the request is still reflected in the body.
A `204` or `304` has no body, since HTTP doesn't allow one.

## Answer Slowly

```sh
curl 'localhost:8080/checkout' -H 'X-Glass-Delay: 2.5s'
```

The delay is a Go duration *(`300ms`, `2.5s`, `1m`)* or a plain number of seconds
*(`2.5`)*.
It's capped at 10 seconds by default; raise the cap with `--max-delay` *(see
[Configuration](../reference/configuration))*.

The two headers combine, so a slow `504` is one request:

```sh
curl -i 'localhost:8080/checkout' -H 'X-Glass-Status: 504' -H 'X-Glass-Delay: 8s'
```

## From a URL

A health check or a browser that can't set headers uses the query params instead:

```text
http://localhost:8080/health?glass-status=503&glass-delay=2s
```

They're prefixed with `glass-` because `?status=open` or `?delay=5` already mean something to
the services Looking Glass stands in for; a plain `status` or `delay` is just reflected.
The header wins when both are set, and the query params are reflected like any other.

## Bad Values

A status outside `200`–`599`, or a delay that isn't a duration or is longer than the cap, is
answered with `400` and the reason, so a typo can't pass as a real answer.

A delay ends early when Looking Glass shuts down, so a slow request is still answered.
If the client hangs up while it waits, the activity log shows `499`.

## Next Steps

- [Cross-Origin Requests](./cross-origin-requests): send these headers from a page.
- [WebSockets](./websockets): a status refuses the upgrade, and a delay holds it.
- [Activity Log](./activity-log): each line shows the status the request got.
