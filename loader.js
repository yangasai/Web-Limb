/* Загрузка в начале */
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    setTimeout(() => {
        loader.style.display = 'none'; // Скрыть анимацию загрузки
        content.classList.add('visible'); // Показать контент
    }, 2000);
});