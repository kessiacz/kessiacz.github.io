// ─── Detecção de dispositivo touch ───────────────────────────────────────────
const isTouchDevice = () =>
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

// ─── Typewriter ───────────────────────────────────────────────────────────────
const typeText = "Tech Developer | Sistemas - Automação - Interfaces";
let typeIndex = 0;
function type() {
    const target = document.getElementById("typewriter");
    if (!target) return;
    if (typeIndex < typeText.length) {
        target.innerHTML += typeText.charAt(typeIndex);
        typeIndex++;
        setTimeout(type, 100);
    }
}
window.addEventListener('load', type);

// ─── Hamburger menu ───────────────────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        navLinksEl.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        // Impede scroll do body quando menu está aberto
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar ao clicar em qualquer link do menu
    navLinksEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinksEl.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
        if (
            navLinksEl.classList.contains('open') &&
            !navLinksEl.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            hamburger.classList.remove('open');
            navLinksEl.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// ─── Tilt 3D na foto (apenas desktop com mouse) ───────────────────────────────
if (!isTouchDevice()) {
    const frame = document.querySelector('.photo-frame');
    if (frame) {
        frame.addEventListener('mousemove', (e) => {
            const { offsetWidth: width, offsetHeight: height } = frame;
            const { offsetX: x, offsetY: y } = e;
            const moveX = ((x / width)  - 0.5) * 20;
            const moveY = ((y / height) - 0.5) * 20;
            frame.style.transition = 'transform 0.1s ease-out';
            frame.style.transform  = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
        });
        frame.addEventListener('mouseleave', () => {
            frame.style.transition = 'transform 0.5s ease';
            frame.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
}

// ─── Barra de progresso de scroll ────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const scrolled = (
        document.documentElement.scrollTop /
        (document.documentElement.scrollHeight - window.innerHeight)
    ) * 100;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = scrolled + '%';
}, { passive: true });

// ─── Custom Cursor (apenas dispositivos com mouse) ────────────────────────────
if (!isTouchDevice()) {
    const cursorDot     = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform =
                `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        (function animate() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.transform =
                `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animate);
        })();

        // Crescer ao passar em elementos interativos
        const interactiveEls = document.querySelectorAll(
            'a, button, .project-card, .contact-item'
        );
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width           = '55px';
                cursorOutline.style.height          = '55px';
                cursorOutline.style.backgroundColor = 'var(--teal-dim)';
                cursorOutline.style.border          = '1px solid var(--teal)';
                cursorOutline.style.opacity         = '0.2';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width           = '34px';
                cursorOutline.style.height          = '34px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.border          = '1px solid var(--teal)';
                cursorOutline.style.opacity         = '0.4';
            });
        });
    }
}

// ─── Links ativos na nav (Intersection Observer) ──────────────────────────────
const sections  = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ─── Animações ao scroll (skill-card e project-card) ─────────────────────────
const animItems = document.querySelectorAll('.skill-card, .project-card');

const animObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el    = entry.target;
            const delay = Array.from(animItems).indexOf(el) % 4 * 80;
            setTimeout(() => el.classList.add('visible'), delay);
            animObs.unobserve(el);
        }
    });
}, { threshold: 0.12 });

animItems.forEach(el => animObs.observe(el));
