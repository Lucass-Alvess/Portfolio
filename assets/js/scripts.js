// =========================================
// 1. TEMA (LIGHT/DARK MODE)
// =========================================
const toggleSwitch = document.getElementById('checkbox-tema');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function applyTheme(theme) {
    const isDark = theme === 'dark';
    body.classList.toggle('dark-theme', isDark);
    toggleSwitch.checked = isDark; 
    themeIcon.textContent = isDark ? '🌙' : '☀️'; 
}

// Recupera a preferência salva no navegador ao carregar
const currentTheme = localStorage.getItem('theme');
if (currentTheme) applyTheme(currentTheme);

toggleSwitch.addEventListener('change', (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

// =========================================
// 2. TELA DE CARREGAMENTO (PRELOADER)
// =========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => preloader.classList.add('escondido'), 500); 
    }
});

// =========================================
// 3. NAVEGAÇÃO E ANIMAÇÕES DE SCROLL
// =========================================

// Botão Flutuante (Voltar ao Topo)
const fabTopo = document.getElementById('fab-topo');

if (fabTopo) {
    window.addEventListener('scroll', () => {
        // Exibe o botão apenas após rolar a primeira viewport inteira
        fabTopo.classList.toggle('mostrar', window.scrollY > window.innerHeight);
    });

    fabTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Intersection Observer para animações de revelação (Scroll Reveal)
const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('mostrar-scroll');
        } else {
            entry.target.classList.remove('mostrar-scroll');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.oculto').forEach((elemento) => {
    myObserver.observe(elemento);
});

// =========================================
// 4. EFEITO TYPEWRITER (HERO SECTION)
// =========================================
const tituloElement = document.getElementById('titulo-digitando');
const subtituloElement = document.getElementById('subtitulo-digitando');

if (tituloElement && subtituloElement) {
    const textoTitulo = "Lucas Alves";
    const textoSubtitulo = "Desenvolvedor de Software";

    const cursor1 = document.createElement('span');
    cursor1.className = 'cursor-pisca';

    const cursor2 = document.createElement('span');
    cursor2.className = 'cursor-pisca';
    cursor2.style.backgroundColor = 'var(--cor-texto-claro)'; 

    let i = 0, j = 0;

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
            setTimeout(() => cursor2.classList.add('cursor-escondido'), 2000);
        }
    }

    function digitarTitulo() {
        if (i === 0) tituloElement.appendChild(cursor1);

        if (i < textoTitulo.length) {
            cursor1.insertAdjacentText('beforebegin', textoTitulo.charAt(i));
            i++;
            setTimeout(digitarTitulo, 120); 
        } else {
            setTimeout(digitarSubtitulo, 500); 
        }
    }

    digitarTitulo();
}

// =========================================
// 5. FORMULÁRIO DE CONTATO (FORMSPREE)
// =========================================
const contatoForm = document.querySelector('.contato-form');
const notificacao = document.getElementById('notificacao');

function mostrarNotificacao(mensagem, tipo) {
    notificacao.textContent = mensagem;
    notificacao.className = `notificacao ${tipo} mostrar`;
    setTimeout(() => notificacao.classList.remove('mostrar'), 3500);
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contatoForm) {
    contatoForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !mensagem) {
            return mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
        }

        if (!validarEmail(email)) {
            return mostrarNotificacao('Por favor, insira um e-mail válido.', 'erro');
        }

        const botaoSubmit = contatoForm.querySelector('button[type="submit"]');
        const textoOriginal = botaoSubmit.textContent;
        botaoSubmit.textContent = 'Enviando...';
        botaoSubmit.disabled = true;

        try {
            const resposta = await fetch(contatoForm.action, {
                method: 'POST',
                body: new FormData(contatoForm),
                headers: { 'Accept': 'application/json' }
            });

            if (resposta.ok) {
                mostrarNotificacao('Mensagem enviada com sucesso!', 'sucesso');
                contatoForm.reset(); 
            } else {
                throw new Error('Falha no envio');
            }
        } catch (erro) {
            mostrarNotificacao('Ops! Ocorreu um erro ao enviar a mensagem.', 'erro');
        } finally {
            botaoSubmit.textContent = textoOriginal;
            botaoSubmit.disabled = false;
        }
    });
}

// =========================================
// 6. MENU MOBILE (HAMBÚRGUER)
// =========================================
const btnMobile = document.querySelector('.menu-mobile-btn');
const menu = document.querySelector('.menu');
const linksMenu = document.querySelectorAll('.menu a');

if (btnMobile && menu) {
    // Abre/fecha o menu ao clicar no botão
    btnMobile.addEventListener('click', () => {
        menu.classList.toggle('ativo');
        btnMobile.classList.toggle('ativo');
    });

    // Fecha o menu automaticamente quando clica em algum link (rolar para a seção)
    linksMenu.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('ativo');
            btnMobile.classList.remove('ativo');
        });
    });
}