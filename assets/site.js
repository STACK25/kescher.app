/* kescher.app — the site's own script, and the only one it needs.

   One job: the Auto / Light / Dark switch in the top bar. It is loaded in
   <head> without `defer` so the stored choice is on <html> before the first
   paint and no page flashes the wrong theme; the buttons are wired once the
   document is parsed. Without it the page still renders — "Auto" is simply
   what every visitor gets.

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
