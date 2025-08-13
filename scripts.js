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