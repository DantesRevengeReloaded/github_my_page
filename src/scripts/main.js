document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#cta');
  const projectsSection = document.querySelector('#projects');
  const yearBadge = document.querySelector('#year');

  if (button && projectsSection) {
    button.addEventListener('click', () => {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (yearBadge) {
    yearBadge.textContent = new Date().getFullYear();
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
