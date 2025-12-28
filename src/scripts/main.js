document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#cta');
  const projectsSection = document.querySelector('#projects');
  const yearBadge = document.querySelector('#year');
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (button && projectsSection) {
    button.addEventListener('click', () => {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (yearBadge) {
    yearBadge.textContent = new Date().getFullYear();
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (siteNav.classList.contains('is-open')) {
          siteNav.classList.remove('is-open');
          navToggle.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const revealTargets = document.querySelectorAll('[data-reveal]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealTargets.length) {
    if (prefersReducedMotion) {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = parseFloat(el.dataset.reveal || '0');
            el.style.setProperty('--reveal-delay', `${delay}s`);
            requestAnimationFrame(() => el.classList.add('is-visible'));
            obs.unobserve(el);
          });
        },
        {
          threshold: 0.35,
          rootMargin: '0px 0px -10% 0px',
        }
      );

      revealTargets.forEach((el) => observer.observe(el));
    }
  }

  console.log('Minimal portfolio ready.');
});
