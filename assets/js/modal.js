<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Formulário de Viagem</title>
  <style>
    .was-validated input:invalid {
      border-color: red;
    }
    .was-validated input:valid {
      border-color: green;
    }
  </style>
</head>
<body onload="setMinDate()">

  <form id="contactForm" novalidate>
    <label for="name">Nome:</label>
    <input type="text" id="name" required><br><br>

    <label for="destino">Destino:</label>
    <input type="text" id="destino" required><br><br>

    <label for="ida">Data de Ida:</label>
    <input type="date" id="ida" required><br><br>

    <label for="volta">Data de Volta:</label>
    <input type="date" id="volta" required><br><br>

    <label for="email">E-mail:</label>
    <input type="email" id="email" required><br><br>

    <label for="whatsapp">WhatsApp:</label>
    <input type="tel" id="whatsapp" required pattern="^\d{10,15}$" title="Digite apenas números, com DDD"><br><br>

    <button type="submit">Enviar</button>
  </form>

  <script>
    // Define a data mínima para ida e volta
    function setMinDate() {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      const tomorrow = today.toISOString().split('T')[0];
      document.getElementById('ida').setAttribute('min', tomorrow);
      document.getElementById('volta').setAttribute('min', tomorrow);
    }

    // Garante que a data de volta seja maior ou igual à de ida
    document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('ida').addEventListener('change', function () {
        const ida = document.getElementById('ida').value;
        document.getElementById('volta').setAttribute('min', ida);
      });
    });

    // Validação e envio
    document.getElementById('contactForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const form = this;
      // Exibe mensagens de erro se houver campos inválidos
      if (form.reportValidity()) {
        sendToEmail();
      } else {
        form.classList.add('was-validated');
      }
    });

    // Função para montar e abrir o e-mail
    function sendToEmail() {
      const name = document.getElementById('name').value;
      const destino = document.getElementById('destino').value;
      const ida = document.getElementById('ida').value;
      const volta = document.getElementById('volta').value;
      const email = document.getElementById('email').value;
      const whatsapp = document.getElementById('whatsapp').value;

      const subject = encodeURIComponent('Solicitação de viagem');
      const body = encodeURIComponent(
        `Nome: ${name}\n` +
        `Destino: ${destino}\n` +
        `Data de ida: ${ida}\n` +
        `Data de volta: ${volta}\n` +
        `E-mail: ${email}\n` +
        `WhatsApp: ${whatsapp}\n`
      );

      const mailtoLink = `mailto:viagens@jrgirotto.com.br?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    }
  </script>
</body>
</html>
