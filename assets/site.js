/* kescher.app — the site's own script, and the only one it needs.

   Two jobs, both done before the first paint, which is why it is loaded in
   <head> without `defer`. The Auto / Light / Dark switch in the top bar: the
   stored choice goes on <html> so no page flashes the wrong theme, and the
   buttons are wired once the document is parsed. And which browser is looking:
   `data-browser` on <html> lets the CSS put the visitor's own install button
   first. Without the script the page still renders — "Auto", Firefox first.

   It talks to nothing. The analytics on this site are driven by the
   data-umami-event attributes in the markup, which Umami reads itself. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var KEY = 'kescher-theme';

  function read() {
    try {
      return localStorage.getItem(KEY) || 'auto';
    } catch (e) {
      /* storage blocked (private window, blocked site data) — Auto it is */
      return 'auto';
    }
  }

  function paint(value) {
    if (value === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', value);
  }

  /* Before first paint. */
  paint(read());

  /* Which browser is looking. Vivaldi presents itself as Chrome, so it lands
     in "chromium" beside Edge, Brave and Opera, which is right: they share one
     package. Phones get no pick, because neither store installs Kescher there.
     User-Agent Client Hints first, where they exist; the UA string otherwise. */
  function family() {
    var ua = navigator.userAgent || '';
    if (/Android|Mobile|iPhone|iPad/.test(ua)) return 'other';
    var hints = navigator.userAgentData;
    if (hints && hints.brands) {
      for (var i = 0; i < hints.brands.length; i += 1)
        if (/Chrom|Edge|Opera|Brave/.test(hints.brands[i].brand)) return 'chromium';
    }
    if (/Firefox\//.test(ua)) return 'firefox';
    if (/Chrome\/|Chromium\/|Edg\/|OPR\//.test(ua)) return 'chromium';
    return 'other';
  }
  root.setAttribute('data-browser', family());

  function ready(fn) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    var buttons = Array.prototype.slice.call(doc.querySelectorAll('.tog button'));
    if (!buttons.length) return;

    function apply(value) {
      paint(value);
      buttons.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.t === value));
      });
    }

    apply(read());

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var value = button.dataset.t;
        try {
          if (value === 'auto') localStorage.removeItem(KEY);
          else localStorage.setItem(KEY, value);
        } catch (e) {
          /* storage blocked — the choice still applies to this page view */
        }
        apply(value);
      });
    });
  });
})();
