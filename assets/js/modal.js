// Função para definir a data mínima para hoje no campo "Data de Ida"
    function setMinDate() {
      const today = new Date();
      today.setDate(today.getDate() + 1); // Adiciona um dia para obter a data de amanhã
      const tomorrow = today.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

      document.getElementById('ida').setAttribute('min', tomorrow);
      document.getElementById('volta').setAttribute('min', tomorrow);
    }
  
  
  
    // Função de validação
    function validateAndSend() {
      // Referência ao formulário
      const form = document.getElementById('contactForm');

      // Verifica se o formulário é válido
      if (form.checkValidity()) {
        // Se for válido, enviar os dados para o WhatsApp
        sendToWhatsApp();
      } else {
        // Se não for válido, mostrar as mensagens de erro
        form.classList.add('was-validated');
      }
    }

    // Função para enviar os dados para o WhatsApp
    function sendToWhatsApp() {
      // Coletando os dados do formulário
      const name = document.getElementById('name').value;
      const destino = document.getElementById('destino').value;
	  const ida = document.getElementById('ida').value;
      const volta = document.getElementById('volta').value;
      const email = document.getElementById('email').value;
      const whatsapp = document.getElementById('whatsapp').value;

      // Número de WhatsApp da empresa (adicione o código do país, por exemplo: 5511999999999 para Brasil)
      const companyWhatsAppNumber = '5514996985241';

      // Montando a mensagem para ser enviada
      //const text = `Nome: ${name}%0AEmail: ${email}%0AWhatsApp: ${whatsapp}%0AMensagem: ${message}`;
	  const text = `Olá, meu nome é ${name}. Gostaria de informações sobre uma viagem para ${destino}. Data de ida: ${ida} - Data de volta: ${volta}. Meu WhatsApp é ${whatsapp} e o email ${email}.`;

      // Gerando o link de WhatsApp com os dados
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${companyWhatsAppNumber}&text=${text}`;

      // Redirecionando o usuário para o WhatsApp
      window.open(whatsappUrl, '_blank');
    }
	
	// Função para garantir que a data de volta seja maior que a data de ida
    document.getElementById('ida').addEventListener('change', function () {
      const ida = document.getElementById('ida').value;
      document.getElementById('volta').setAttribute('min', ida);
    });

    // Chamar a função para configurar a data mínima no carregamento da página
    window.onload = setMinDate;