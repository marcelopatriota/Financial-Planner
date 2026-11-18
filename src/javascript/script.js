$(document).ready(function() {
    
    // 1. Controle do Menu Mobile (Botão Hambúrguer)
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x'); // Troca o ícone de hambúrguer para o "X"
    });

    // 2. Navegação Âncora (Smooth Scroll) ao clicar nos links do menu
    $('nav a, #mobile_nav_list a').on('click', function(e) {
        e.preventDefault(); // Evita o pulo seco padrão do HTML
        
        const targetId = $(this).attr('href'); // Identifica a seção de destino (ex: #menu)
        // Calcula a posição do elemento na tela, descontando 90px para o header fixo não cobrir o título
        const targetPosition = $(targetId).offset().top - 90; 

        // Executa a rolagem suave com duração de 800 milissegundos
        $('html, body').animate({
            scrollTop: targetPosition
        }, 800);

        // Se o menu mobile estiver aberto, fecha automaticamente após o clique
        if ($('#mobile_menu').hasClass('active')) {
            $('#mobile_menu').removeClass('active');
            $('#mobile_btn').find('i').removeClass('fa-x');
        }
    });

    // 3. Sombra no Header e Marcação do Menu Ativo ao Rolar a Página
    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        // Corrige a sombra do header ao rolar
        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)'); 
        }

        // Identifica qual seção está visível na tela para pintar o link do menu de dourado
        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false; // Interrompe o laço assim que encontrar a seção
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

// 4. Animações de Aparição Suave (ScrollReveal)
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        reset: false // false garante que a animação ocorra apenas na primeira leitura
    }); // <-- A chave fechada corretamente aqui!

    // Animações Intercaladas (Textos e Imagens da área "O Processo")
    sr.reveal('h2', { delay: 200, origin: 'top', distance: '30px' });
    sr.reveal('.texto', { delay: 300, origin: 'left', distance: '60px' });
    sr.reveal('.imagem', { delay: 400, origin: 'right', distance: '60px' });
    
    // Animações da Biblioteca, Audible e Kindle
    sr.reveal('.book-card', { delay: 300, origin: 'bottom', interval: 200 });
    sr.reveal('.audible-banner', { delay: 500, origin: 'bottom', distance: '40px' });
    sr.reveal('.kindle-banner', { delay: 600, origin: 'bottom', distance: '40px' });

    // Animação do Rodapé
    sr.reveal('footer', { delay: 200, origin: 'bottom', distance: '40px' });
});
