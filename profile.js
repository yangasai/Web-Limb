function openUser() {
    const inLogin = localStorage.getItem('isLoggedIn') === 'true';
    const userContainer = document.getElementById("userEnt");
    const profileDisplay = document.getElementById("profileDisplay");

    if (inLogin) {
        if (profileDisplay.style.display === "block") {
            profileDisplay.style.display = "none";
        } else {
            const username = localStorage.getItem('username');
            profileDisplay.querySelector('#profileName').textContent = username;
            profileDisplay.style.display = "block";
        }
        userContainer.style.display = "none";
    } else {
        profileDisplay.style.display = "none";
        userContainer.style.display = "flex";
    }
}

function logout() {
    // Сброс данных о пользователе
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    // Обновляем интерфейс
    updateProfileName('');
    document.getElementById("profileDisplay").style.display = "none";
    document.getElementById("userEnt").style.display = "flex"; // Показываем контейнер для входа
    alert("Вы вышли из аккаунта."); // Информируем пользователя
}

function closeUser() {
    document.getElementById("userEnt").style.display = "none";
}

function closeUser() {
    document.getElementById("userEnt").style.display = "none";
}

function userRegistration() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('userRegistration').style.display = 'block';
}

function showLogin() {
    document.getElementById('userRegistration').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return false;
            } else {
                alert(data.message);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                updateProfileName(username);
                return true;
            }
        })
        .catch(error => {
            console.error(error);
            return false;
        });
}

function updateProfileName(username) {
    const profileNameElement = document.getElementById('profileName');
    profileNameElement.textContent = username ? username : 'Гость';
}


function validateRegistration() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    const passwordError = document.getElementById('passwordError');

    if (password !== passwordConfirm) {
        passwordError.style.display = 'block';
        return false;
    } else {
        passwordError.style.display = 'none';
    }

    return fetch('/api/validateRegistration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, passwordConfirm })
    })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                return fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message);
                        return true;
                    })
                    .catch(error => {
                        console.error(error);
                        return false;
                    });
            } else {
                alert('Пароли не совпадают');
                return false;
            }
        })
        .catch(error => {
            console.error(error);
            return false;
        });
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById("userEnt");
    if (event.target === modal) {
        closeUser();
    }
};
