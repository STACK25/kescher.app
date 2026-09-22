/* kescher.app — the site's own script, and the only one it needs.

   One job, done before the first paint, which is why it is loaded in <head>
   without `defer`: which browser is looking. `data-browser` on <html> lets the
   CSS put the visitor's own install button first. Without the script the page
   still renders, with Firefox first.

   The site has one theme, dark, so there is no switch to remember and nothing
   is written to storage.

   It talks to nothing. The analytics on this site are driven by the
   data-umami-event attributes in the markup, which Umami reads itself. */
(function () {
  'use strict';

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
  document.documentElement.setAttribute('data-browser', family());
})();
