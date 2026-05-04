/* Header scroll state */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* Mobile nav toggle */
(function () {
  const burger = document.querySelector('.burger');
  const mnav = document.querySelector('.mobile-nav');
  if (!burger || !mnav) return;

  burger.addEventListener('click', () => {
    const open = mnav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mnav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      mnav.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    })
  );
})();

/* Reveal on scroll via IntersectionObserver */
(function () {
  const els = document.querySelectorAll('.reveal-on-scroll');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  els.forEach((el) => io.observe(el));
})();

/* Simple form stub */
(function () {
  const forms = document.querySelectorAll('form[data-demo]');
  forms.forEach((f) => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = f.querySelector('button[type="submit"]');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>Sent — thank you</span>';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.disabled = false;
          f.reset();
        }, 2800);
      }
    });
  });
})();
