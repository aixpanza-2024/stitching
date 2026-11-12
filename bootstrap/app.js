/* ==========================================================================
   STITCHY — demo interaction layer
   SOW-013/2026 · AIXPANZA Pvt. Ltd.
   Django: place at  static/js/app.js
   Frontend demo only. Replace these handlers with real views/URLs at build.
   ========================================================================== */
(function () {
  'use strict';

  /* Jump to another screen from a button anywhere in the page.
     Markup:  <button data-goto="view-orderdetail">Open</button>
     Works by activating the matching sidebar nav link, so the sidebar
     highlight always stays in step with the visible screen. */
  function goTo(viewId) {
    var trigger = document.querySelector('[data-bs-target="#' + viewId + '"]');
    if (!trigger) return;
    bootstrap.Tab.getOrCreateInstance(trigger).show();
    var oc = document.getElementById('mobileNav');
    if (oc) {
      var inst = bootstrap.Offcanvas.getInstance(oc);
      if (inst) inst.hide();
    }
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-goto]');
    if (!el) return;
    e.preventDefault();
    goTo(el.getAttribute('data-goto'));
  });

  /* Mobile offcanvas: mirror the desktop sidebar links so there is one
     source of truth for navigation in the demo. */
  var desktop = document.getElementById('sidebarNav');
  var mobileBody = document.getElementById('mobileNavBody');
  if (desktop && mobileBody) {
    mobileBody.innerHTML = desktop.innerHTML;
    mobileBody.querySelectorAll('[data-bs-target]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        goTo(btn.getAttribute('data-bs-target').replace('#', ''));
      });
    });
  }

  /* Keep the sidebar scrolled to the active item on load. */
  var active = document.querySelector('.sidebar .nav-link.active');
  if (active && active.scrollIntoView) {
    active.scrollIntoView({ block: 'nearest' });
  }

  /* Print buttons in the document screens. */
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-print]')) {
      e.preventDefault();
      window.print();
    }
  });
})();
