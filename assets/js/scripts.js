const themeButton = document.getElementById('theme-button');
const body = document.body;

// Verifica se o usuário já tinha uma preferência salva
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeButton.textContent = 'Modo Claro';
}

themeButton.addEventListener('click', () => {
    // Alterna a classe dark-theme no body
    body.classList.toggle('dark-theme');
    
    // Verifica qual tema está ativo para salvar e mudar o texto do botão
    let theme = 'light';
    if (body.classList.contains('dark-theme')) {
        theme = 'dark';
        themeButton.textContent = 'Modo Claro';
    } else {
        themeButton.textContent = 'Modo Escuro';
    }
    
    // Salva a escolha no navegador
    localStorage.setItem('theme', theme);
});