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

  /* The stream band's animation (site.css, "motion"): once the flow is in view,
     every piece gets its way to the net as --dx/--dy and a start delay --d, the
     nearest piece first, and .in starts it. Once only. Nothing happens for
     visitors who asked for less motion or in a browser without an
     IntersectionObserver: the flow then simply stays as it is drawn. */
  function armFlow() {
    var flow = document.querySelector('.flow');
    if (!flow || !('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var net = flow.querySelector('.mesh');
    var pieces = Array.prototype.slice.call(flow.querySelectorAll('.segs i'));
    if (!net || !pieces.length) return;
    flow.classList.add('armed');

    function start() {
      var target = net.getBoundingClientRect();
      var cx = target.left + target.width / 2;
      var cy = target.top + target.height / 2;
      var far = 1;
      var ways = pieces.map(function (piece) {
        var box = piece.getBoundingClientRect();
        var dx = cx - (box.left + box.width / 2);
        var dy = cy - (box.top + box.height / 2);
        var length = Math.sqrt(dx * dx + dy * dy);
        if (length > far) far = length;
        return { piece: piece, dx: dx, dy: dy, length: length };
      });
      ways.forEach(function (way) {
        way.piece.style.setProperty('--dx', way.dx.toFixed(1) + 'px');
        way.piece.style.setProperty('--dy', way.dy.toFixed(1) + 'px');
        way.piece.style.setProperty('--d', ((way.length / far) * 0.8).toFixed(3) + 's');
      });
      flow.classList.add('in');
    }

    var seen = new IntersectionObserver(
      function (entries) {
        if (!entries[0].isIntersecting) return;
        seen.disconnect();
        start();
      },
      { threshold: 0.45 }
    );
    seen.observe(flow);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', armFlow);
  else armFlow();
})();
