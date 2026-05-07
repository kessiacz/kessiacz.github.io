// --- Efeito Typewriter ---
const text = "Tech Developer | Sistemas - Automação - Interfaces";
let i = 0;
function type() {
    const target = document.getElementById("typewriter");
    if (i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 100);
    }
}
window.addEventListener('load', type);

// --- Interatividade na Foto (Tilt 3D) ---
const frame = document.querySelector('.photo-frame');
if (frame) {
    frame.addEventListener('mousemove', (e) => {
        const { offsetWidth: width, offsetHeight: height } = frame;
        const { offsetX: x, offsetY: y } = e;
        
        const moveX = ((x / width) - 0.5) * 20; 
        const moveY = ((y / height) - 0.5) * 20;
        
        // Adicionamos uma transição curta para suavizar o movimento seguindo o mouse
        frame.style.transition = "transform 0.1s ease-out";
        frame.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });

    frame.addEventListener('mouseleave', () => {
        frame.style.transition = "transform 0.5s ease";
        frame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
}

// --- Barra de Progresso de Scroll ---
window.addEventListener('scroll', () => {
    const scrolled = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = scrolled + '%';
});

// --- Cursor ---
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;

// Captura a posição real do mouse
window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

// Animação para o círculo externo
function animate() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animate);
}

// Inicia o loop de animação
animate();

// Crescer ao passar em links
const links = document.querySelectorAll('a, button, .project-card, .contact-item');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '55px';
        cursorOutline.style.height = '55px';
        cursorOutline.style.backgroundColor = 'var(--teal-dim)';
        cursorOutline.style.border = '1px solid var(--teal)';
        cursorOutline.style.opacity = '0.2';
    });
    
    link.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '34px';
        cursorOutline.style.height = '34px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.border = '1px solid var(--teal)';
        cursorOutline.style.opacity = '0.4';
    });
});

// --- Links Ativos e Animações ---
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

const animItems = document.querySelectorAll('.skill-card, .project-card');
const animObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = Array.from(animItems).indexOf(el) % 4 * 80;
            setTimeout(() => el.classList.add('visible'), delay);
            animObs.unobserve(el);
        }
    });
}, { threshold: 0.15 });

animItems.forEach(el => animObs.observe(el));