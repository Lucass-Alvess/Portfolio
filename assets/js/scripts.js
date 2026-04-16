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

// =========================================
// ANIMAÇÃO DE SCROLL (REVEAL)
// =========================================

// Cria o "olheiro" (Observer)
const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('mostrar-scroll');
            
        } else {
        
            entry.target.classList.remove('mostrar-scroll');
        }
    });
}, {
    threshold: 0.1 
});

const elementosOcultos = document.querySelectorAll('.oculto');
elementosOcultos.forEach((elemento) => myObserver.observe(elemento));

// =========================================
// EFEITO MÁQUINA DE ESCREVER (SUAVE)
// =========================================
const tituloElement = document.getElementById('titulo-digitando');
const subtituloElement = document.getElementById('subtitulo-digitando');

// Os textos que você quer que sejam digitados
const textoTitulo = "Lucas Alves";
const textoSubtitulo = "Desenvolvedor de Software";

// Cria os cursores de digitação
const cursor1 = document.createElement('span');
cursor1.classList.add('cursor-pisca');

const cursor2 = document.createElement('span');
cursor2.classList.add('cursor-pisca');
cursor2.style.backgroundColor = 'var(--cor-texto-claro)'; 

let i = 0;
let j = 0;

function digitarSubtitulo() {
    if (j === 0) {
        cursor1.classList.add('cursor-escondido');
        subtituloElement.appendChild(cursor2);
    }

    if (j < textoSubtitulo.length) {
        cursor2.insertAdjacentText('beforebegin', textoSubtitulo.charAt(j));
        j++;
        setTimeout(digitarSubtitulo, 60); 
    } else {
        setTimeout(() => {
            cursor2.classList.add('cursor-escondido');
        }, 2000);
    }
}

function digitarTitulo() {
    if (i === 0) {
        tituloElement.appendChild(cursor1);
    }

    if (i < textoTitulo.length) {
        cursor1.insertAdjacentText('beforebegin', textoTitulo.charAt(i));
        i++;
        setTimeout(digitarTitulo, 120); 
    } else {
        setTimeout(digitarSubtitulo, 500); 
    }
}

digitarTitulo();

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('escondido');
    }, 500); 
});