// Navbar Functionality
class Navbar {
    constructor() {
        this.mobileToggle = document.getElementById('mobileToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileClose = document.getElementById('mobileClose');
        this.mobileOverlay = document.getElementById('mobileOverlay');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initScrollEffect();
        this.initActiveNav();
    }

    bindEvents() {
        // Mobile menu toggle
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        this.mobileClose.addEventListener('click', () => this.closeMobileMenu());
        this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMobileMenu();
        });
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('active');
        this.mobileOverlay.classList.toggle('active');
        this.mobileToggle.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.mobileOverlay.classList.remove('active');
        this.mobileToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    initScrollEffect() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    initActiveNav() {
        const updateActiveNav = () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
            
            let current = '';
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.parentElement.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveNav);
        window.addEventListener('load', updateActiveNav);
    }
}

// Theme Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.mobileThemeToggle = document.getElementById('mobileThemeToggle');
        this.init();
    }

    init() {
        this.loadTheme();
        this.bindEvents();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            this.updateIcons('dark');
        }
    }

    bindEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.mobileThemeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
            this.updateIcons('dark');
        } else {
            localStorage.setItem('theme', 'light');
            this.updateIcons('light');
        }
    }

    updateIcons(theme) {
        const icons = document.querySelectorAll('#theme-toggle i, #mobileThemeToggle i');
        icons.forEach(icon => {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
}

// Translation Functionality
class TranslationManager {
    constructor() {
        this.translateBtn = document.getElementById('translate-btn');
        this.mobileTranslateToggle = document.getElementById('mobileTranslateToggle');
        this.currentLang = 'pt';
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.translateBtn.addEventListener('click', () => this.toggleLanguage());
        this.mobileTranslateToggle.addEventListener('click', () => this.toggleLanguage());
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'pt' ? 'en' : 'pt';
        this.updateTexts();
        this.updateButton();
    }

    updateTexts() {
        const translations = {
            pt: {
                'Início': 'Início',
                'Sobre': 'Sobre',
                'Habilidades': 'Habilidades',
                'Projetos': 'Projetos',
                'Contato': 'Contato',
                'Vamos Conversar': 'Vamos Conversar',
                'Tema': 'Tema',
                'Currículo': 'Currículo'
            },
            en: {
                'Início': 'Home',
                'Sobre': 'About',
                'Habilidades': 'Skills',
                'Projetos': 'Projects',
                'Contato': 'Contact',
                'Vamos Conversar': "Let's Talk",
                'Tema': 'Theme',
                'Currículo': 'Resume'
            }
        };

        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[this.currentLang][key]) {
                element.textContent = translations[this.currentLang][key];
            }
        });
    }

    updateButton() {
        const span = this.mobileTranslateToggle.querySelector('span');
        span.textContent = this.currentLang === 'pt' ? 'EN' : 'PT';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navbar();
    new ThemeManager();
    new TranslationManager();
});






//código em javascript para o envio do e-mail
class ContactForm {
    constructor() {
        this.form = $('#contact-form');
        this.init();
    }

    init() {
        this.form.on('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const nome = $('#nome').val().trim();
        const email = $('#email').val().trim();
        const mensagem = $('#mensagem').val().trim();

        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!this.isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        const assunto = `Contato do Portfolio - ${nome}`;
        const corpo = `Nome: ${nome}%0D%0AE-mail: ${email}%0D%0A%0D%0AMensagem:%0D%0A${mensagem}`;

        const mailtoLink = `mailto:grandesuriel@gmail.com?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
        window.location.href = mailtoLink;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Inicializar quando o documento estiver pronto
$(document).ready(() => {
    new ContactForm();
});

$(document).ready(function() {
    // Mensagem de sucesso simples
    $('#contact-form').on('submit', function() {
        // Feedback visual imediato
        const btn = $(this).find('button[type="submit"]');
        const originalText = btn.text();
        
        btn.html('<i class="fas fa-spinner fa-spin"></i> Enviando...');
        btn.prop('disabled', true);
        
        setTimeout(() => {
            btn.html(originalText);
            btn.prop('disabled', false);
        }, 10000); // 10 segundos, tempo para o redirecionamento
    });
});