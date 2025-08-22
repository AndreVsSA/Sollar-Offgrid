// Calculadora CMI - Envio via WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formCalculadoraCMI');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const dados = [
                "Alarme para: " + (form.tipo.value || ''),
                "Residência: " + (form.habitual.value || ''),
                "Tipo de residência: " + (form.residencia.value || ''),
                "Tempo sozinha: " + (form.tempo_sozinha.value || ''),
                "Animais de estimação: " + (form.pets.value || ''),
                "Telefone: " + (form.telefone.value || '')
            ];
            const msg = encodeURIComponent("Simulação de segurança:\n" + dados.join('\n'));
            window.open("https://wa.me/5511996991019?text=" + msg, "_blank");
        });
    }
});

// Carousel com animação de slide para o bloco de exemplos
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.cta-comparativo-carousel .carousel-track');
    const imgs = document.querySelectorAll('.cta-comparativo-carousel .carousel-img');
    const prevBtn = document.querySelector('.cta-comparativo-carousel .carousel-btn.prev');
    const nextBtn = document.querySelector('.cta-comparativo-carousel .carousel-btn.next');
    let current = 0;
    let isSliding = false;

    // Inicializa posições
    imgs.forEach((img, idx) => {
        img.style.position = 'absolute';
        img.style.left = 0;
        img.style.top = 0;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.opacity = idx === current ? 1 : 0;
        img.style.zIndex = idx === current ? 2 : 1;
        img.style.transition = 'opacity 0.45s cubic-bezier(.4,0,.2,1)';
        img.style.display = 'block';
    });

    function slideTo(next) {
        if (isSliding || next === current) return;
        isSliding = true;
        const currImg = imgs[current];
        const nextImg = imgs[next];

        nextImg.style.transition = 'none';
        nextImg.style.opacity = 0;
        nextImg.style.zIndex = 3;
        void nextImg.offsetWidth;
        nextImg.style.transition = 'opacity 0.45s cubic-bezier(.4,0,.2,1)';
        nextImg.style.opacity = 1;

        setTimeout(() => {
            currImg.style.opacity = 0;
            currImg.style.zIndex = 1;
            nextImg.style.zIndex = 2;
            current = next;
            isSliding = false;
        }, 450);
    }

    if (track && imgs.length > 0 && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (isSliding) return;
            let next = (current - 1 + imgs.length) % imgs.length;
            slideTo(next);
        });
        nextBtn.addEventListener('click', () => {
            if (isSliding) return;
            let next = (current + 1) % imgs.length;
            slideTo(next);
        });
    }
});