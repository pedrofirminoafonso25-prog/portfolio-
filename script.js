// ============================================================
// ALTERE AQUI AS INFORMAÇÕES DO PORTFÓLIO
// ============================================================
// Nome, bio, links e tecnologias podem ser alterados diretamente
// no arquivo index.html, nas seções correspondentes.
//
// O JavaScript abaixo gerencia apenas a interatividade do site.
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. MENU MOBILE
    // ============================================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const menuIcon = document.getElementById('menuIcon');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            // Alterna ícone
            if (nav.classList.contains('open')) {
                menuIcon.className = 'fas fa-times';
                menuToggle.setAttribute('aria-label', 'Fechar menu');
            } else {
                menuIcon.className = 'fas fa-bars';
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                menuIcon.className = 'fas fa-bars';
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('open') &&
                !nav.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                nav.classList.remove('open');
                menuIcon.className = 'fas fa-bars';
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
    }

    // ============================================================
    // 2. SCROLL SUAVE (já nativo com scroll-behavior: smooth no CSS)
    //    Mas garantimos comportamento consistente.
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================================
    // 3. HEADER SCROLL EFFECT
    // ============================================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================================
    // 4. DARK / LIGHT MODE
    // ============================================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Verifica preferência salva
    let currentTheme = localStorage.getItem('theme') || 'dark';

    // Aplica o tema salvo
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            let newTheme;

            if (current === 'dark') {
                newTheme = 'light';
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-sun';
            } else {
                newTheme = 'dark';
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-moon';
            }

            localStorage.setItem('theme', newTheme);
        });
    }

    // ============================================================
    // 5. ANO ATUAL NO FOOTER
    // ============================================================
    const anoAtual = document.getElementById('anoAtual');
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    // ============================================================
    // 6. ANIMAÇÕES AO APARECER (Intersection Observer)
    // ============================================================
    // Anima cards e seções com fade-in suave
    const animarElementos = document.querySelectorAll(
        '.sobre-grid, .tecnologias-grid, .projeto-card, .contacto-grid'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animarElementos.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(el);
    });

    // ============================================================
    // 7. EFEITO DE DIGITAÇÃO NO TÍTULO (opcional)
    //    Descomente se quiser um efeito de digitação.
    //    Atenção: requer ajuste no HTML (hero-name com id)
    // ============================================================
    // const nomeElemento = document.getElementById('heroName');
    // if (nomeElemento) {
    //     const texto = nomeElemento.textContent;
    //     nomeElemento.textContent = '';
    //     let i = 0;
    //     const interval = setInterval(() => {
    //         if (i < texto.length) {
    //             nomeElemento.textContent += texto.charAt(i);
    //             i++;
    //         } else {
    //             clearInterval(interval);
    //         }
    //     }, 80);
    // }

    console.log('🚀 Portfólio de Pedro Firmino Afonso carregado com sucesso!');
});