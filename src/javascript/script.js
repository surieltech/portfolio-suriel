// ============================================
// NAVBAR FUNCTIONALITY (FUNCIONAL)
// ============================================

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

// ============================================
// THEME FUNCTIONALITY (USANDO dark-mode NO BODY)
// ============================================

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
        } else {
            document.body.classList.remove('dark-mode');
            this.updateIcons('light');
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

// ============================================
// TRANSLATION FUNCTIONALITY
// ============================================

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
                'Currículo': 'Currículo',
                'Todos os Projetos': 'Todos os Projetos',
                'Projetos Profissionais': 'Projetos Profissionais',
                'Projetos Pessoais': 'Projetos Pessoais',
                'projetos encontrados': 'projetos encontrados',
                'Nenhum projeto encontrado': 'Nenhum projeto encontrado',
                'Tente selecionar outra categoria ou verifique mais tarde.': 'Tente selecionar outra categoria ou verifique mais tarde.',
                'Ver Mais no GitHub': 'Ver Mais no GitHub',
                'Nome Completo': 'Nome Completo',
                'Seu nome completo': 'Seu nome completo',
                'E-mail': 'E-mail',
                'Seu melhor e-mail': 'Seu melhor e-mail',
                'Assunto': 'Assunto',
                'Assunto da mensagem': 'Assunto da mensagem',
                'Mensagem': 'Mensagem',
                'Insira sua mensagem aqui...': 'Insira sua mensagem aqui...',
                'Enviar Mensagem': 'Enviar Mensagem'
            },
            en: {
                'Início': 'Home',
                'Sobre': 'About',
                'Habilidades': 'Skills',
                'Projetos': 'Projects',
                'Contato': 'Contact',
                'Vamos Conversar': "Let's Talk",
                'Tema': 'Theme',
                'Currículo': 'Resume',
                'Todos os Projetos': 'All Projects',
                'Projetos Profissionais': 'Professional Projects',
                'Projetos Pessoais': 'Personal Projects',
                'projetos encontrados': 'projects found',
                'Nenhum projeto encontrado': 'No projects found',
                'Tente selecionar outra categoria ou verifique mais tarde.': 'Try selecting another category or check back later.',
                'Ver Mais no GitHub': 'See More on GitHub',
                'Nome Completo': 'Full Name',
                'Seu nome completo': 'Your full name',
                'E-mail': 'Email',
                'Seu melhor e-mail': 'Your best email',
                'Assunto': 'Subject',
                'Assunto da mensagem': 'Message subject',
                'Mensagem': 'Message',
                'Insira sua mensagem aqui...': 'Enter your message here...',
                'Enviar Mensagem': 'Send Message'
            }
        };

        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[this.currentLang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[this.currentLang][key];
                } else {
                    element.textContent = translations[this.currentLang][key];
                }
            }
        });
    }

    updateButton() {
        const span = this.mobileTranslateToggle.querySelector('span:last-child');
        if (span) {
            span.textContent = this.currentLang === 'pt' ? 'EN' : 'PT';
        }
    }
}

// ============================================
// PROJECTS FILTER FUNCTIONALITY
// ============================================

class ProjectsFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.projectsCount = document.getElementById('projects-count');
        this.noProjectsMsg = document.getElementById('no-projects');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProjectsCount();
    }

    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                
                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterProjects(filter) {
        let visibleCount = 0;
        
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        this.updateProjectsCount(visibleCount);
    }

    updateProjectsCount(count = null) {
        if (count === null) {
            count = document.querySelectorAll('.project-card:not(.hidden)').length;
        }
        
        if (this.projectsCount) {
            this.projectsCount.textContent = count;
        }
        
        if (this.noProjectsMsg) {
            this.noProjectsMsg.style.display = count === 0 ? 'block' : 'none';
        }
    }
}

// ============================================
// CONTACT FORM FUNCTIONALITY (SEM JQUERY)
// ============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const assunto = document.getElementById('assunto').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !assunto || !mensagem) {
            this.showFormStatus('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showFormStatus('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        // Prepare email
        const assuntoFinal = `Contato Portfólio - ${assunto}`;
        const corpo = `Nome: ${nome}%0D%0AE-mail: ${email}%0D%0AAssunto: ${assunto}%0D%0A%0D%0AMensagem:%0D%0A${mensagem}`;
        const mailtoLink = `mailto:grandesuriel@gmail.com?subject=${encodeURIComponent(assuntoFinal)}&body=${encodeURIComponent(corpo)}`;

        // Redirect to email client
        window.location.href = mailtoLink;

        // Restore button after 3 seconds (time for email client to open)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.showFormStatus('Abrindo seu cliente de e-mail...', 'info');
        }, 3000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFormStatus(message, type) {
        const statusElement = document.getElementById('form-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `form-status ${type}`;
            statusElement.style.display = 'block';

            // Hide after 5 seconds
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }
}

// ============================================
// ANIMATIONS ON SCROLL
// ============================================

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.skill-item, .project-card, .competency-item').forEach(el => {
            observer.observe(el);
        });
    }
}

// ============================================
// UPDATE COPYRIGHT YEAR
// ============================================

function updateCopyrightYear() {
    const copyrightElement = document.getElementById('copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} SurielTech - Todos os direitos reservados`;
    }
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    new Navbar();
    new ThemeManager();
    new TranslationManager();
    new ProjectsFilter();
    new ContactForm();
    new ScrollAnimations();
    updateCopyrightYear();
});