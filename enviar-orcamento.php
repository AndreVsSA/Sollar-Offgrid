<?php
// Configuração
$destinatario = "offgridengenharia@gmail.com"; // Altere para seu e-mail real
$nome_site = "Sollar Offgrid"; // Nome do site ou empresa

// Recebe dados do formulário
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$telefone = isset($_POST['telefone']) ? trim($_POST['telefone']) : '';
$opcao = isset($_POST['opcao']) ? trim($_POST['opcao']) : '';

// Validação básica
if (!$nome || !$email || !$telefone || !$opcao) {
    http_response_code(400);
    exit('Dados inválidos');
}

// Data/hora atual
date_default_timezone_set('America/Sao_Paulo');
$datahora = date('d/m/Y H:i:s');

// Mensagem padrão WhatsApp
$mensagem_padrao = 'Olá, gostaria de fazer um orçamento de ' . strtolower($opcao) . '.';

// Corpo do e-mail
$corpo = <<<EOT
Olá,

Você recebeu um novo pedido de orçamento através do formulário do site.

🕒 Data/Hora: {$datahora}
👤 Nome do Cliente: {$nome}
📧 E-mail do Cliente: {$email}
📞 Telefone: {$telefone}
🛠️ Tipo de Serviço: {$opcao}



Atenciosamente,
{$nome_site}
EOT;

// Cabeçalhos
$headers = "From: contato@servicoseseguranca.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Verifica se a função mail() está disponível
if (!function_exists('mail')) {
    error_log("Função mail() não está disponível no servidor em $datahora\n", 3, __DIR__ . '/erro_envio_email.log');
    http_response_code(500);
    echo "ERRO: Função mail() não disponível no servidor.";
    exit;
}

// Teste de envio e log detalhado
$result = mail($destinatario, "Novo pedido de orçamento - {$opcao}", $corpo, $headers);

if ($result) {
    echo "OK";
} else {
    // Log detalhado para debug
    $errorMsg = "Erro ao enviar e-mail para $destinatario em $datahora\n";
    $errorMsg .= "Headers:\n$headers\n";
    $errorMsg .= "Corpo:\n$corpo\n";
    $errorMsg .= "PHP Version: " . phpversion() . "\n";
    $errorMsg .= "sendmail_path: " . ini_get('sendmail_path') . "\n";
    $errorMsg .= "SMTP: " . ini_get('SMTP') . "\n";
    $errorMsg .= "smtp_port: " . ini_get('smtp_port') . "\n";
    error_log($errorMsg, 3, __DIR__ . '/erro_envio_email.log');
    http_response_code(500);
    echo "ERRO";
}
?>
