function openUser() {
    document.getElementById("userEnt").style.display = "flex";
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
                localStorage.setItem('isLoggedIn', 'true'); // Устанавливаем статус входа
                localStorage.setItem('username', username); // Сохраняем имя пользователя
                updateProfileName(username); // Обновляем имя профиля
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
    profileNameElement.textContent = username; // Устанавливаем текст элемента
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
