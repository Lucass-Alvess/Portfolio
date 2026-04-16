const toggleSwitch = document.getElementById('checkbox-tema');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        toggleSwitch.checked = true; 
        themeIcon.textContent = '🌙'; 
    } else {
        body.classList.remove('dark-theme');
        toggleSwitch.checked = false; 
        themeIcon.textContent = '☀️'; 
    }
}

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    applyTheme(currentTheme);
}

toggleSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    }
});

// =========================================
// VALIDAÇÃO E ENVIO REAL DO FORMULÁRIO (FORMSPREE)
// =========================================
const contatoForm = document.querySelector('.contato-form');
const notificacao = document.getElementById('notificacao');

function mostrarNotificacao(mensagem, tipo) {
    notificacao.textContent = mensagem;
    notificacao.className = `notificacao ${tipo} mostrar`;

    setTimeout(() => {
        notificacao.classList.remove('mostrar');
    }, 3500);
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

contatoForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validações
    if (!nome || !email || !mensagem) {
        mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
        return; 
    }

    if (!validarEmail(email)) {
        mostrarNotificacao('Por favor, insira um e-mail válido.', 'erro');
        return; 
    }

    // Muda o texto do botão para mostrar que está carregando
    const botaoSubmit = contatoForm.querySelector('button[type="submit"]');
    const textoOriginal = botaoSubmit.textContent;
    botaoSubmit.textContent = 'Enviando...';
    botaoSubmit.disabled = true;

    // --- ENVIO REAL PARA O FORMSPREE ---
    try {
        const resposta = await fetch(contatoForm.action, {
            method: 'POST',
            body: new FormData(contatoForm),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (resposta.ok) {
            mostrarNotificacao('Mensagem enviada com sucesso!', 'sucesso');
            contatoForm.reset(); // Limpa o formulário
        } else {
            mostrarNotificacao('Ops! Ocorreu um erro ao enviar a mensagem.', 'erro');
        }
    } catch (erro) {
        mostrarNotificacao('Erro de conexão. Verifique sua internet.', 'erro');
    } finally {
        // Restaura o botão ao estado normal
        botaoSubmit.textContent = textoOriginal;
        botaoSubmit.disabled = false;
    }
});

// =========================================
// BOTÃO FLUTUANTE (VOLTAR AO TOPO)
// =========================================
const fabTopo = document.getElementById('fab-topo');

if (fabTopo) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            fabTopo.classList.add('mostrar');
        } else {
            fabTopo.classList.remove('mostrar');
        }
    });

    fabTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}