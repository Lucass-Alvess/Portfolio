const toggleSwitch = document.getElementById('checkbox-tema');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        toggleSwitch.checked = true; 
        themeIcon.textContent = '🌙'; // Apenas a lua
    } else {
        body.classList.remove('dark-theme');
        toggleSwitch.checked = false; 
        themeIcon.textContent = '☀️'; // Apenas o sol
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