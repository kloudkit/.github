---
description: "Call Looking Glass with fetch from a page on another origin, and choose whether cookies come along."
---

# Cross-Origin Requests

A page can call Looking Glass with `fetch` from any origin and read the reflection.
Use it to see what a frontend really sends, without a proxy in between.
Cookies only come along when you turn credentials on.

## At a Glance

- Looking Glass running *(see [Getting Started](./getting-started))*.
- A page on any origin, `localhost` or deployed.

## From a Page

```js
const res = await fetch('http://localhost:8080/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Glass-Format': 'json' },
  body: JSON.stringify({ name: 'ada' }),
})

console.log(await res.json())
```

Every response allows the page's `Origin`, so the page can read it, custom headers included.
A request without an `Origin` gets `Access-Control-Allow-Origin: *`.

## Credentials

By default, responses don't allow credentials, so a `fetch` with `credentials: 'include'`
can't read what comes back.
That's on purpose: the reflection carries the request's cookies, so if any site could read
it, any site could read the cookies scoped to Looking Glass's host, `HttpOnly` ones too.

Turn credentials on when you need to see what cookies a frontend sends:

```sh
docker run --rm -p 8080:8080 -e CORS_CREDENTIALS=true ghcr.io/kloudkit/looking-glass:latest
```

::: warning
With credentials on, keep Looking Glass off any host that shares cookies with real apps
*(a subdomain of a domain whose cookies are set for every subdomain)*.
:::

## Preflights

A preflight *(an `OPTIONS` with `Origin` and `Access-Control-Request-Method`)* is answered
`204`, allowing the method and headers it asked for, and cached by the browser for an hour.
It isn't reflected, since the browser never shows its body; the activity log still records
it as `preflight`.

Any other `OPTIONS` request is reflected like the rest.

## Next Steps

- [WebSockets](./websockets): the same cookie rule, for sockets.
- [Status and Delay](./status-and-delay): make the page's request fail, or wait.
- [Response Formats](./response-formats): HTML or JSON.
