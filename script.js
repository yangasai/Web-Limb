/* Отмотка в самое начало страницы */
function scrollToTop() {
    const topElement = document.getElementById('top');
    if (topElement) {
        topElement.scrollIntoView({
            behavior: 'smooth'
        });
    }
}


/* Прокрутка по тегам каталога */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}


/* Метод наблюдения для отображения элементов */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function checkVisibility() {
    const container = document.querySelector('.containerSocial');
    if (isElementInViewport(container)) {
        container.classList.add('visible');
        // Убираем слушателя после первого срабатывания
        window.removeEventListener('scroll', checkVisibility);
    }
}

// Добавляем слушатель события прокрутки
window.addEventListener('scroll', checkVisibility);

// Проверяем видимость при загрузке страницы
checkVisibility();



/* Просмотр скриншотов геймплея */
function openModal(imageSrc) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = 'material/' + imageSrc;
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal.classList.remove('show');
        modal.classList.remove('fade-out'); // Убираем класс анимации исчезновения
    }, 500);
}


/* Проверка доступа к покупке */
function Buy() {
    let inLogin = false;
    if (!inLogin) {
        openUser();
    }
    else {
        window.location.href = 'nextPage.html';
    }
}







