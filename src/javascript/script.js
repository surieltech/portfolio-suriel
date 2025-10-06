//código para o menu no mobile
$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-x');
    });

    // Fechar o menu ao clicar em um link
    $('#mobile_nav_list a').on('click', function() {
        $('#mobile_menu').removeClass('active');
        $('#mobile_btn').find('i').removeClass('fa-x').addClass('fa-bars');
    });
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