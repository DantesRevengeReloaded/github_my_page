document.addEventListener('DOMContentLoaded', () => {
  /* ── 1. YEAR BADGE ── */
  const yearBadge = document.querySelector('#year');
  if (yearBadge) yearBadge.textContent = new Date().getFullYear();

  /* ── 2. MOBILE NAV TOGGLE ── */
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav   = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when a link is tapped (mobile)
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── 3. RAF-THROTTLED SCROLL LISTENERS ── */
  // All scroll listeners share a single rAF loop — no duplicate work per frame.
  const header   = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  let ticking = false;

  const processScroll = () => {
    const y = window.scrollY;

    // 3a. Sticky header shrink
    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
    }

    // 3b. Active nav link highlighting
    if (sections.length && navLinks.length) {
      let currentId = '';
      sections.forEach((sec) => {
        if (y >= sec.offsetTop - 120) currentId = sec.id;
      });
      navLinks.forEach((a) => {
        a.classList.toggle('is-active', a.getAttribute('href') === `#${currentId}`);
      });
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(processScroll);
      ticking = true;
    }
  }, { passive: true });

  // Run once immediately on load
  processScroll();

  /* ── 4. SCROLL-REVEAL WITH STAGGER ── */
  document.documentElement.classList.add('has-reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cards get auto-staggered by their index within each grid/list
  const staggerParents = document.querySelectorAll(
    '.project-grid, .dashboard-grid, .contact-grid, .hub-grid, .hub-story, .hub-process__grid, .hub-agents__grid'
  );
  staggerParents.forEach((parent) => {
    Array.from(parent.children).forEach((child, i) => {
      if (!child.hasAttribute('data-reveal')) {
        child.setAttribute('data-reveal', String(i * 0.07));
      }
    });
  });

  // All elements with data-reveal
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el    = entry.target;
          const delay = parseFloat(el.dataset.reveal || '0');
          el.style.setProperty('--reveal-delay', `${delay}s`);
          requestAnimationFrame(() => el.classList.add('is-visible'));
          obs.unobserve(el);
        });
      },
      {
        threshold:   0.08,           // fire a little earlier for snappier feel
        rootMargin: '0px 0px -4% 0px',
      }
    );
    revealTargets.forEach((el) => observer.observe(el));
  }

  /* ── 5. EASING-BASED SMOOTH SCROLL ── */
  // Uses an easeInOutQuart curve for a natural feel on both desktop and iOS.
  const HEADER_OFFSET = parseInt(
    getComputedStyle(document.documentElement).scrollPaddingTop || '80',
    10
  );

  function easeInOutQuart(t) {
    return t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2;
  }

  function smoothScrollTo(targetY, duration = 600) {
    const startY = window.scrollY;
    const delta  = targetY - startY;
    if (Math.abs(delta) < 2) return;

    let startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      const elapsed  = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + delta * easeInOutQuart(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') {
        e.preventDefault();
        smoothScrollTo(0);
        return;
      }
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      const rawTop = target.getBoundingClientRect().top + window.scrollY;
      const destY  = Math.max(0, rawTop - HEADER_OFFSET + 8);
      smoothScrollTo(destY);
    });
  });
});
