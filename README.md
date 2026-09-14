# kescher.app

The website of [Kescher](https://kescher.app), a free browser extension that
finds the videos a page plays and saves them to disk. Static HTML, no build
step; GitHub Pages serves the `main` branch as is.

```
index.html            the landing page
privacy/  license/  imprint/   the three documents linked in the footer
404.html
assets/site.css       stylesheet and theme tokens (light, dark, system)
assets/site.js        the Auto / Light / Dark switch
assets/a.js           the loader of the self-hosted, cookieless visit counter
                      described on /privacy/
assets/fonts/         Manrope, self-hosted (SIL Open Font License, see LICENSE-Manrope.txt)
assets/og.png         the social card
favicon.svg  robots.txt  sitemap.xml  CNAME
```

Every page ships a strict Content Security Policy: scripts and styles only
from this origin plus the counter's own host, fonts from this origin, no
inline scripts.

## Preview locally

```
python3 -m http.server 8080
```

then open <http://127.0.0.1:8080/>. The pages use root-relative paths, so
they need a server rather than `file://`.

## Downloads

The download buttons point at the latest release of this repository:
`kescher-chrome.zip` for Chrome, Vivaldi, Edge, Brave and Opera, and
`kescher-firefox.xpi` for Firefox.

## Contact

See the [imprint](https://kescher.app/imprint/). Security problems: see
[`SECURITY.md`](SECURITY.md).
