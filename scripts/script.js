/* ============================================================
   1. CONFIGURAÇÃO LIGHT MODE (Sincronizado com o LocalStorage)
   ============================================================ */
const initLightMode = () => {
    const checkbox = document.querySelector('#checkbox');
    const body = document.body;

    // Recupera a preferência salva para manter harmonia entre páginas
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (checkbox) checkbox.checked = true;
    }

    if (checkbox) {
        checkbox.addEventListener('change', () => {
            body.classList.toggle('light-mode');
            const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    }
}

/* ============================================================
   2. CONTROLE DO MENU MOBILE (ABRIR/FECHAR)
   ============================================================ */
const initOpenMenu = () => {
    const menuBtn = document.querySelector('.menu i:first-child');
    const closeBtn = document.querySelector('.menu i.ri-close-line');
    const menu = document.querySelector('.menuOpen');
    const header = document.querySelector('header');

    const toggleMenu = (isOpen) => {
        if (!menu) return;
        
        if (isOpen) {
            menu.classList.remove('hidden');
            menuBtn.classList.add('hidden');
            closeBtn.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            header.classList.add('open');
        } else {
            menu.classList.add('hidden');
            menuBtn.classList.remove('hidden');
            closeBtn.classList.add('hidden');
            document.body.style.overflow = 'visible';
            header.classList.remove('open');
        }
    };

    if (menuBtn && closeBtn) {
        menuBtn.addEventListener('click', () => toggleMenu(true));
        closeBtn.addEventListener('click', () => toggleMenu(false));
    }

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") toggleMenu(false);
    });

    // Fechar menu ao clicar em links internos
    const menuLinks = document.querySelectorAll('.menuOpen nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

/* ============================================================
   3. INICIALIZAÇÃO GERAL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initLightMode();
    initOpenMenu();
    
    // Opcional: Log para confirmar que o script carregou na página de exercícios
    console.log("Interface de Exercícios Inicializada com Sucesso.");
});
