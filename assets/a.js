/* kescher.app — loader for the site's self-hosted, cookieless Umami.

   The tracker origin is one constant in one first-party file. It points at the
   first-party host a.kescher.app, a name of this site that fronts the
   maintainer's own Umami instance; changing where it points is one line here,
   plus the same host in the meta CSP of every page. */
(function () {
  'use strict';

  var TRACKER_ORIGIN = 'https://a.kescher.app';
  var WEBSITE_ID = 'fb865bc4-56d3-4d9c-a285-5f75c126855d';

  /* Umami's own opt-out. With it set, the script is not even fetched. */
  try {
    if (window.localStorage.getItem('umami.disabled')) return;
  } catch (e) {
    /* storage blocked — carry on; nothing here sets a cookie either way */
  }

  var s = document.createElement('script');
  s.defer = true;
  s.src = TRACKER_ORIGIN + '/s.js';
  s.setAttribute('data-website-id', WEBSITE_ID);
  s.setAttribute('data-domains', 'kescher.app,www.kescher.app');
  (document.head || document.documentElement).appendChild(s);
})();
