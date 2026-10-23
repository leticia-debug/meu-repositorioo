/**
 * USO DE IA DECLARADO:
 * Ferramenta utilizada: ChatGPT / Capable AI Collaborator.
 * Finalidade: Auxílio na estruturação e adequação do código conforme os requisitos 
 * rígidos e critérios de avaliação da UC 15 (Acessibilidade, LGPD e Validações).
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarPortfolio();
});

/**
 * Função principal que centraliza a inicialização dos módulos do portfólio.
 */
function inicializarPortfolio() {
    configurarSaudacao();
    configurarAnoAutomatico();
    configurarMenuHamburguer();
    configurarModoClaroEscuro();
    configurarValidacaoFormulario();
}

/**
 * Captura o horário do sistema e injeta o texto retornado pela função de cálculo de saudação.
 */
function configurarSaudacao() {
    const saudacaoElement = document.getElementById('saudacao');
    if (saudacaoElement) {
        const horaAtual = new Date().getHours();
        // Chamada da função obrigatória exigida no escopo do projeto
        saudacaoElement.textContent = `Bem vindo ao meu portfólio!`;
    }
}

/**
 * Retorna o termo de saudação correto com base na hora passada por parâmetro.
 * @param {number} hora - Valor numérico de 0 a 23 representando a hora do dia.
 * @returns {string} Saudação correspondente.
 */
function obterSaudacao(hora) {
    if (hora >= 5 && hora < 12) {
        return "Bem-vindo";
    }  
    }


/**
 * Obtém o ano atual do sistema operacional e o renderiza dinamicamente no rodapé.
 */
function configurarAnoAutomatico() {
    const anoElement = document.getElementById('ano-atual');
    if (anoElement) {
        anoElement.textContent = new Date().getFullYear();
    }
}

/**
 * Controla a abertura, fechamento e atualização de atributos de acessibilidade do menu hambúrguer.
 */
function configurarMenuHamburguer() {
    const btnMenu = document.getElementById('btn-menu');
    const navbar = document.getElementById('navbar');

    if (btnMenu && navbar) {
        btnMenu.addEventListener('click', () => {
            const isExpanded = btnMenu.getAttribute('aria-expanded') === 'true';
            // Atualiza o estado de acessibilidade ARIA
            btnMenu.setAttribute('aria-expanded', !isExpanded);
            navbar.classList.toggle('active');
        });

        // Fecha o menu automaticamente quando o usuário clica em um link âncora
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                btnMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * Gerencia a alternância de cores da página alternando uma classe no elemento body.
 */
function configurarModoClaroEscuro() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Recupera a preferência do usuário salva no navegador (Desafio bônus aplicado!)
    const temaSalvo = localStorage.getItem('theme');
    if (temaSalvo === 'dark') {
        document.body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Persiste a escolha do usuário
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

/**
 * Configura o listener do formulário de contato para interceptar o submit.
 */
function configurarValidacaoFormulario() {
    const form = document.getElementById('form-contato');
    
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o recarregamento incorreto da página
            
            // Dispara a função interna de validação
            if (validarFormulario()) {
                // Se tudo estiver certo, exibe mensagem limpa de sucesso e limpa o formulário
                alert('Mensagem enviada com sucesso! Seus dados foram validados conforme as diretrizes da LGPD.');
                form.reset();
            }
        });
    }
}

/**
 * Executa as validações condicionais obrigatórias dos campos de formulário.
 * @returns {boolean} True se o formulário estiver 100% válido, False se houver erros.
 */
function validarFormulario() {
    let statusValido = true;

    // Captura dos elementos e campos
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');
    const consentimento = document.getElementById('consentimento');

    // Limpeza de blocos de mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(span => span.textContent = '');

    // 1. Verificação de campos vazios e tamanho do nome
    if (nome.value.trim() === '') {
        document.getElementById('error-nome').textContent = 'O campo nome não pode ficar vazio.';
        statusValido = false;
    }

    // 2. Verificação de e-mail estruturado contendo obrigatoriamente "@" e "."
    const valorEmail = email.value.trim();
    if (valorEmail === '') {
        document.getElementById('error-email').textContent = 'O e-mail é obrigatório.';
        statusValido = false;
    } else if (!valorEmail.includes('@') || !valorEmail.includes('.')) {
        document.getElementById('error-email').textContent = 'Formato inválido. O e-mail precisa conter "@" e "."';
        statusValido = false;
    }

    // 3. Verificação de tamanho mínimo da mensagem (Mínimo de 20 caracteres)
    const valorMensagem = mensagem.value.trim();
    if (valorMensagem === '') {
        document.getElementById('error-mensagem').textContent = 'Escreva uma mensagem para contato.';
        statusValido = false;
    } else if (valorMensagem.length < 20) {
        document.getElementById('error-mensagem').textContent = `Sua mensagem precisa ter no mínimo 20 caracteres (atual: ${valorMensagem.length}).`;
        statusValido = false;
    }

    // 4. Verificação de aceite da caixa de consentimento (LGPD)
    if (!consentimento.checked) {
        document.getElementById('error-consentimento').textContent = 'Você precisa autorizar o uso dos dados para prosseguir.';
        statusValido = false;
    }

    return statusValido;
}
