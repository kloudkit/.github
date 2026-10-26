# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who already know at least one KloudKIT tool, usually arriving from a GitHub repo, a docs
site footer or a shared link.
They come to see what else the org makes and to jump to a tool's docs or source.
Newcomers from search are a secondary audience; the page does not need to convert them.

## Product Purpose

kloudkit.com is the org's index and identity card: one page that names KloudKIT, says what it
stands for and lists every tool with its docs and GitHub links.
Success is a visitor recognising the org and reaching the right tool in one click.
It is not a sales page and carries no funnel.

## Positioning

KloudKIT is an open-source org, not a company.
It builds developer tools that take the friction out of everyday development, with Kloud
Workspace as the flagship and smaller tools around it.
Nothing is sold: no pricing, no support plans, no sign-up, no contact form.

## Operating Context

- The landing page is hand-written HTML in `landing/`, built by `scripts/build-landing.mjs`
  and served from Cloudflare Pages with `landing/_headers`.
- Each tool has its own VitePress docs site under `sites/<id>/` (Kloud Workspace's lives in
  `kloudkit/ws-docs`), all on the shared `theme/`.
- `landing/llms.txt` indexes each tool's own `llms.txt`.

## Capabilities and Constraints

- Tools today: Kloud Workspace (ws.kloudkit.com), TestShed (testshed.kloudkit.com), Looking
  Glass (lookingglass.kloudkit.com), Portico (portico.kloudkit.com).
- Colours and font stacks come only from `theme/tokens.css` (Catppuccin Frappé), which the docs
  sites share. The landing page must not redefine them.
- Open, not yet decided: whether the page stays dark-only and whether it stays framework-free.

## Brand Commitments

- Name written `KloudKIT`; tagline "Your KIT to the cloud".
- Each tool has its own logo, icon and lead colour in `landing/tools/` and `brand/`; these fall
  under `brand/LICENSE`, not MIT.
- Voice follows ws-docs: second person, active, plain. No "simply", "easily", "seamless",
  "powerful", no em dashes.

## Evidence on Hand

- Tool names, taglines and one-line descriptions in `landing/index.html` and `landing/llms.txt`.
- Brand assets in `brand/` and `landing/tools/`.
- No star counts, download numbers, users, testimonials or logos exist for the page. Do not
  invent any.

## Product Principles

1. The tools are the content: every element should help a visitor reach one.
2. One org, many tools: the page reads as one family while each tool keeps its own colour.
3. Honest about scale: an open-source project, never dressed as a company.
4. Shared before local: anything the docs sites also use lives in `theme/`.
