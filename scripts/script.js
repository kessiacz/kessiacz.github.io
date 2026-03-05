/* ============================================================
   CONFIGURAÇÃO LIGHT MODE
   ============================================================ */
const initLightMode = () => {
    const checkbox = document.querySelector('input[type="checkbox"]');
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            document.body.classList.toggle('light-mode');
        });
    }
}

/* ============================================================
   CONTROLE DO MENU MOBILE (ABRIR/FECHAR)
   ============================================================ */
const initOpenMenu = () => {
    const menuBtn = document.querySelector('header .menu i');
    const closeBtn = document.querySelector('header .menu i:nth-child(2)');
    const menu = document.querySelector('.menuOpen');
    const header = document.querySelector('header');

    const close = () => {
        if (menu) {
            menu.classList.add('hidden');
            menuBtn.classList.remove('hidden');
            closeBtn.classList.add('hidden');
            document.body.style.overflow = 'visible';
            header.classList.remove('open');
        }
    }

    const open = () => {
        menu.classList.remove('hidden');
        menuBtn.classList.add('hidden');
        closeBtn.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        header.classList.add('open');
    }

    if (menuBtn && closeBtn) {
        menuBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
    }

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") close();
    });

    // Fechar menu ao clicar em qualquer link (incluindo a nova Página Inicial)
    const links = document.querySelectorAll('nav a, .menuOpen nav a');
    links.forEach(link => {
        link.addEventListener('click', close);
    });
}

/* ============================================================
   ANIMAÇÃO DE SCROLL (REVELAR SEÇÕES)
   ============================================================ */
const initAnimationScroll = () => {
    const sections = document.querySelectorAll('.js-section');
    if (sections.length === 0) return;

    const windowHalfSize = window.innerHeight * 0.7;
    
    const animateScroll = () => {
        sections.forEach(item => {
            const sectionTop = item.getBoundingClientRect().top;
            const isSectionVisible = (sectionTop - windowHalfSize) < 0;

            if (isSectionVisible) {
                item.classList.add('active');
            }
        });
    }

    animateScroll();
    window.addEventListener('scroll', animateScroll);
}

/* ============================================================
   SCROLL SUAVE PARA LINKS INTERNOS
   ============================================================ */
const initScrollSmooth = () => {
    // Seleciona apenas links que começam com # (internos)
    const linksInternos = document.querySelectorAll('a[href^="#"]');

    linksInternos.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const href = event.currentTarget.getAttribute('href');
            const section = document.querySelector(href);

            if (section) {
                const topo = section.offsetTop - 80;

                window.scrollTo({
                    top: topo,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================================
   ANIMAÇÃO DE DIGITAÇÃO (TYPING)
   ============================================================ */
const initTypingAnimation = () => {
    const title = document.querySelector('#sobre .banner h1');
    const span = document.querySelector('#sobre .banner span');
    const paragraph = document.querySelector('#sobre .banner p');

    const typeWriter = (element, text, speed, callback) => {
        element.innerHTML = '';
        const textToArray = text.split('');
        
        textToArray.forEach((char, index) => {
            setTimeout(() => {
                element.innerHTML += char;
                if (index === textToArray.length - 1 && callback) {
                    callback();
                }
            }, speed * index);
        });
    }

    if (title && span && paragraph) {
        typeWriter(title, 'Olá, eu sou ', 100, () => {
            typeWriter(span, 'Kessia Carvalho :)', 120, () => {
                typeWriter(paragraph, 'Bacharelanda em Engenharia Elétrica e Programadora', 50);
            });
        });
    }
}

/* ============================================================
   INICIALIZAÇÃO DE TODAS AS FUNÇÕES
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initLightMode();
    initOpenMenu();
    initAnimationScroll();
    initScrollSmooth();
    initTypingAnimation();
});
