/**
 * showflo — site behavior
 * Vanilla JS, no dependencies. Respects prefers-reduced-motion throughout.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------------
     Nav: scrolled state + mobile menu
     ---------------------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('nav-toggle');

  function updateNavScrollState() {
    if (window.scrollY > 4) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  updateNavScrollState();
  window.addEventListener('scroll', updateNavScrollState, { passive: true });

  function closeMobileNav() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    nav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // Close mobile nav on link click, Escape, or backdrop resize past mobile breakpoint.
  document.getElementById('nav-mobile').addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMobileNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMobileNav();
      navToggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 720 && nav.classList.contains('is-open')) {
      closeMobileNav();
    }
  });

  /* ----------------------------------------------------------------------
     Scroll-reveal (fade/slide-in), once per element
     ---------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ----------------------------------------------------------------------
     Metrics count-up, once, on first scroll into view
     ---------------------------------------------------------------------- */
  var metricEls = document.querySelectorAll('.metric__value');

  function renderMetric(el, value) {
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    el.textContent = value.toFixed(decimals) + suffix;
  }

  function animateCountUp(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    if (prefersReducedMotion) {
      renderMetric(el, target);
      return;
    }
    var duration = 800;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      renderMetric(el, target * eased);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        renderMetric(el, target);
      }
    }
    window.requestAnimationFrame(step);
  }

  if (metricEls.length) {
    if (!('IntersectionObserver' in window)) {
      metricEls.forEach(animateCountUp);
    } else {
      var metricsObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCountUp(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      metricEls.forEach(function (el) { metricsObserver.observe(el); });
    }
  }

  /* ----------------------------------------------------------------------
     FAQ accordion — single-open-at-a-time, hash-linkable (e.g. #faq-5 from
     the Pricing nav/footer links opens and scrolls to that specific answer).
     ---------------------------------------------------------------------- */
  var accordion = document.getElementById('accordion');
  var accordionItems = accordion ? accordion.querySelectorAll('.accordion__item') : [];

  function openFaqPanel(panelId) {
    accordionItems.forEach(function (item) {
      var trigger = item.querySelector('.accordion__trigger');
      var panel = item.querySelector('.accordion__panel');
      var shouldOpen = panel && panel.id === panelId;
      item.classList.toggle('is-open', shouldOpen);
      trigger.setAttribute('aria-expanded', String(shouldOpen));
    });
  }

  if (accordion) {
    accordionItems.forEach(function (item) {
      var trigger = item.querySelector('.accordion__trigger');
      var panel = item.querySelector('.accordion__panel');

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        openFaqPanel(isOpen ? null : panel.id);
      });
    });
  }

  // Links that point at a specific FAQ answer (Pricing in nav/footer) open it directly.
  document.querySelectorAll('[data-faq-link]').forEach(function (link) {
    link.addEventListener('click', function () {
      var panelId = link.getAttribute('href').slice(1);
      openFaqPanel(panelId);
    });
  });

  // Deep-link support: visiting the page with #faq-N already in the URL opens it.
  if (accordion && location.hash.indexOf('#faq-') === 0) {
    openFaqPanel(location.hash.slice(1));
  }

  /* ----------------------------------------------------------------------
     Disabled actions (e.g. "Log in" pre-launch) — give real, accessible
     feedback instead of silently doing nothing.
     ---------------------------------------------------------------------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 4000);
  }

  document.querySelectorAll('[data-disabled-action]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showToast('Product login opens once your early access is confirmed — request access below.');
    });
  });

  /* ----------------------------------------------------------------------
     Smooth-scroll offset for sticky nav (native smooth-scroll + scroll-margin
     handles most of this via CSS; this covers browsers without scroll-margin
     support by nudging focus targets for accessibility).
     ---------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href').slice(1);
      var targetEl = id && document.getElementById(id);
      if (!targetEl) return;
      // Let the browser handle the scroll (CSS scroll-margin-top below);
      // move focus for keyboard/screen-reader users after scroll settles.
      window.setTimeout(function () {
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }, prefersReducedMotion ? 0 : 400);
    });
  });
})();
