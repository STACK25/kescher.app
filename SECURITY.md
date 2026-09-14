# Security policy

Kescher runs with `<all_urls>` host permissions in the user's own browser. A
bug in it can reach the user's cookies, their disk and the privilege of the
extension origin. We take reports seriously and would much rather hear about a
problem from you than from a user.

## Reporting a vulnerability

**Report privately by e-mail to <info@kescher.app>.** Please do not open a
public issue, a discussion or a social-media post for a security problem
before we have had a chance to fix it.

A useful report contains:

- what an attacker controls (a web page, a manifest, a CDN response, a file
  name, a settings import file, …),
- what they gain (cookies for a foreign host, an arbitrary file write, code
  execution in the extension origin, a leak of browsing data off the machine,
  …),
- the browser and the Kescher version (`chrome://extensions` /
  `about:addons`),
- a minimal reproduction — a small HTML page, a manifest snippet or a server
  response is ideal.

## What to expect

- **Acknowledgement within 7 days.** The project is maintained by one person;
  if you have heard nothing after a week, write again.
- We agree an assessment and a fix window with you. A credible, exploitable
  issue gets a fix in the next release; we will tell you if something takes
  longer and why.
- We credit you in the release notes unless you ask us not to. There is no
  bug bounty.
- Coordinated disclosure: details are published when the fix is released.

## Scope

In scope: the extension as published on kescher.app and in the browser
stores, and this website. Out of scope: the websites Kescher downloads from,
and the browsers themselves.
