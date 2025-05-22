// ===== ЗБЕРЕЖЕННЯ СИСТЕМНОЇ ІНФОРМАЦІЇ =====
const systemInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language
};

localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

// ===== ПІСЛЯ ЗАВАНТАЖЕННЯ СТОРІНКИ =====
window.addEventListener('DOMContentLoaded', () => {
    // Показати системну інформацію у футері
    const footer = document.createElement('footer');
    const data = JSON.parse(localStorage.getItem('systemInfo'));
    footer.innerHTML = `
        <p>Браузер: ${data.userAgent}</p>
        <p>Платформа: ${data.platform}</p>
        <p>Мова: ${data.language}</p>
    `;
    document.body.appendChild(footer);

    // Завантажити коментарі
    const variantNumber = 2; // Замінити на свій номер
    fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`)
        .then(res => res.json())
        .then(comments => {
            const section = document.createElement('section');
            section.innerHTML = `<h2>Коментарі роботодавців</h2>`;
            comments.forEach(comment => {
                const div = document.createElement('div');
                div.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
                section.appendChild(div);
            });
            document.body.appendChild(section);
        });

    // Показати модальне вікно через 60 сек
    setTimeout(() => {
        const modal = document.getElementById('modal');
        if (modal) modal.style.display = 'flex';
    }, 60000);
});

// ===== ТЕМА: Автоматична та ручна =====
function getTimeBasedTheme() {
    const hour = new Date().getHours();
    return (hour >= 7 && hour < 21) ? 'light' : 'dark';
}

function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
}

// Ініціалізація теми
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    const autoTheme = getTimeBasedTheme();
    setTheme(autoTheme);
}

// Перемикач теми
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.className;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
}
