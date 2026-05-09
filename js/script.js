document.addEventListener('DOMContentLoaded', () => {

  /* ── THEME TOGGLE ── */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      const on = themeToggle.checked;
      document.documentElement.classList.toggle('light-mode', on);
      document.body.classList.toggle('light-mode', on);
    });
  }

  /* ── PROGRESS BAR ── */
  const progressBar = document.getElementById('progress-bar');
  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ── CURSOR (desktop) ── */
  const cursorDot     = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top  = `${e.clientY}px`;
      cursorOutline.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 500, fill: 'forwards' }
      );
    });
    window.addEventListener('mousedown', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    window.addEventListener('mouseup', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    document.querySelectorAll('a, button, .project-card, .contact-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width  = '55px';
        cursorOutline.style.height = '55px';
        cursorOutline.style.backgroundColor = 'var(--teal-dim)';
        cursorOutline.style.opacity = '.2';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width  = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.opacity = '.45';
      });
    });
  }

  /* ── HAMBURGER ── */
  const hamburger  = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');
  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      navLinksEl.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('click', e => {
      if (navLinksEl.classList.contains('open') &&
          !navLinksEl.contains(e.target) && !hamburger.contains(e.target)) {
        closeNav();
      }
    });
    function closeNav() {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  /* ── ACTIVE NAV LINKS ── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
        );
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => navObs.observe(s));

  /* ── SCROLL ANIMATIONS ── */
  const animCards = document.querySelectorAll('.skill-card, .project-card');
  animCards.forEach(c => c.classList.add('animate-ready'));

  const cardObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const allCards = [...animCards];
        const i = allCards.indexOf(e.target);
        const delay = Math.max(0, (i % 4) * 80);
        setTimeout(() => {
          e.target.classList.add('visible');
        }, delay);
        obs.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  animCards.forEach(c => cardObs.observe(c));

  setTimeout(() => {
    animCards.forEach(c => {
      if (!c.classList.contains('visible')) {
        c.classList.add('visible');
      }
    });
  }, 1500);

  /* ── PHOTO TILT (desktop only) ── */
  const frame   = document.getElementById('photo-frame');
  const isTouch = window.matchMedia('(hover:none) and (pointer:coarse)').matches;
  if (frame && !isTouch) {
    frame.addEventListener('mousemove', e => {
      const { offsetWidth: w, offsetHeight: h } = frame;
      const mx = ((e.offsetX / w) - .5) * 20;
      const my = ((e.offsetY / h) - .5) * 20;
      frame.style.transition = 'transform .1s ease-out';
      frame.style.transform  = `perspective(1000px) rotateX(${-my}deg) rotateY(${mx}deg)`;
    });
    frame.addEventListener('mouseleave', () => {
      frame.style.transition = 'transform .5s ease';
      frame.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  }

});

/* ── TYPEWRITER ── */
const TW_TEXT = 'Tech Developer | Sistemas - Automação - Interfaces';
let twIdx = 0;
function type() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  if (twIdx < TW_TEXT.length) {
    el.innerHTML += TW_TEXT[twIdx++];
    setTimeout(type, 100);
  }
}
window.addEventListener('load', type);
