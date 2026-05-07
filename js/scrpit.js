// ── Detecção touch ──
const isTouch = () => window.matchMedia('(hover:none) and (pointer:coarse)').matches;

// ── Typewriter ──
const TW_TEXT = "Tech Developer | Sistemas - Automação - Interfaces";
let twIdx = 0;
function type() {
  const el = document.getElementById("typewriter");
  if (!el) return;
  if (twIdx < TW_TEXT.length) { el.innerHTML += TW_TEXT[twIdx++]; setTimeout(type, 100); }
}
window.addEventListener('load', type);

// ── Hamburger ──
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }));
  document.addEventListener('click', e => {
    if (navLinksEl.classList.contains('open') &&
        !navLinksEl.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    }
  });
}

// ── Tilt (só desktop) ──
if (!isTouch()) {
  const frame = document.getElementById('photo-frame');
  if (frame) {
    frame.addEventListener('mousemove', e => {
      const {offsetWidth:w,offsetHeight:h} = frame;
      const mx = ((e.offsetX/w)-.5)*20, my = ((e.offsetY/h)-.5)*20;
      frame.style.transition='transform .1s ease-out';
      frame.style.transform=`perspective(1000px) rotateX(${-my}deg) rotateY(${mx}deg)`;
    });
    frame.addEventListener('mouseleave', () => {
      frame.style.transition='transform .5s ease';
      frame.style.transform='perspective(1000px) rotateX(0) rotateY(0)';
    });
  }
}

// ── Barra de progresso ──
window.addEventListener('scroll', () => {
  const pct = document.documentElement.scrollTop /
    (document.documentElement.scrollHeight - window.innerHeight) * 100;
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = pct + '%';
}, {passive:true});

// ── Cursor (só desktop) ──
if (!isTouch()) {
  const dot = document.querySelector('.cursor-dot');
  const out = document.querySelector('.cursor-outline');
  if (dot && out) {
    let mx=0,my=0,ox=0,oy=0;
    window.addEventListener('mousemove', e => {
      mx=e.clientX; my=e.clientY;
      dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    (function loop(){
      ox+=(mx-ox)*.15; oy+=(my-oy)*.15;
      out.style.transform=`translate(${ox}px,${oy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.project-card,.contact-item').forEach(el=>{
      el.addEventListener('mouseenter',()=>{out.style.width='55px';out.style.height='55px';out.style.backgroundColor='var(--teal-dim)';out.style.opacity='.2'});
      el.addEventListener('mouseleave',()=>{out.style.width='34px';out.style.height='34px';out.style.backgroundColor='transparent';out.style.opacity='.4'});
    });
  }
}

// ── Nav ativa + animações scroll ──
const secs = document.querySelectorAll('section[id],div[id]');
const navAs = document.querySelectorAll('.nav-links a');
new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href')==='#'+e.target.id);
  });
}), {threshold:.4}).observe && secs.forEach(s =>
  new IntersectionObserver(entries => entries.forEach(e => {
    if(e.isIntersecting) navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));
  },{threshold:.4})).observe(s)
);

const cards = document.querySelectorAll('.skill-card,.project-card');
new IntersectionObserver((entries,obs) => entries.forEach(e => {
  if (e.isIntersecting) {
    const i = [...cards].indexOf(e.target);
    setTimeout(()=>e.target.classList.add('visible'), i%4*80);
    obs.unobserve(e.target);
  }
}), {threshold:.12}).observe && cards.forEach(c =>
  new IntersectionObserver((entries,obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const i=[...cards].indexOf(e.target);
        setTimeout(()=>e.target.classList.add('visible'),i%4*80);
        obs.unobserve(e.target);
      }
    });
  },{threshold:.12}).observe(c)
);