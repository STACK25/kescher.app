# kescher.app

The website of [Kescher](https://kescher.app), a free browser extension that
finds the videos a page plays and saves them to disk. Static HTML, no build
step; GitHub Pages serves the `main` branch as is.

```
index.html            the landing page
privacy/  license/  imprint/   the three documents linked in the footer
404.html
assets/site.css       stylesheet and its tokens (one theme: dark)
assets/site.js        which browser is looking, so its install button leads
assets/a.js           the loader of the self-hosted, cookieless visit counter
                      described on /privacy/
assets/fonts/         Manrope, self-hosted (SIL Open Font License, see LICENSE-Manrope.txt)
assets/og.png         the social card
assets/shots/         the extension's panel as WebP, cut out of the store
                      screenshots (scripts/screenshots.mjs in the extension
                      repository); re-cut them when the panel changes
favicon.svg           the tab icon, following the visitor's light or dark theme
favicon.ico  assets/icon-192.png  apple-touch-icon.png
                      the filled app mark as raster files, for search engines
                      and devices that take no SVG (rendered from the
                      extension's assets/icon*.svg with resvg)
robots.txt  sitemap.xml  CNAME
5cf8244c1e17abf3d9c2af3ceea9a38c.txt
                      the IndexNow key: proves to Bing and the other IndexNow
                      engines that a ping for kescher.app comes from its owner
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

Kescher installs from the stores: the
[Chrome Web Store](https://chromewebstore.google.com/detail/kescher/kmobponokcnpchggbonahochfohiaoan) for Chrome, Vivaldi, Edge, Brave and Opera, and
[addons.mozilla.org](https://addons.mozilla.org/firefox/addon/kescher/) for
Firefox. The releases of this repository carry the same build as files:
`kescher-<version>-chrome.zip` (load unpacked in developer mode) and
`kescher-<version>-firefox-unsigned.xpi` (Nightly and Developer Edition only;
a release Firefox refuses an unsigned file).

## Contact

See the [imprint](https://kescher.app/imprint/). Security problems: see
[`SECURITY.md`](SECURITY.md).

## Telling search engines about a change

After a change worth crawling, ping IndexNow (Bing, Yandex, Seznam, Naver; no
account needed). The key is the file `5cf8244c1e17abf3d9c2af3ceea9a38c.txt` at the root:

```
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://api.indexnow.org/indexnow?url=https://kescher.app/&key=5cf8244c1e17abf3d9c2af3ceea9a38c"
```

`200` or `202` means accepted. Google does not take IndexNow; use *Request
indexing* in the Search Console for it.

