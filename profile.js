/* Экран регистрации/входа */
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

// Проверка пароля
function validateRegistration() {
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    const passwordError = document.getElementById('passwordError');

    if (password !== passwordConfirm) {
        passwordError.style.display = 'block';
        return false;
    } else {
        passwordError.style.display = 'none';
    }
    return true;
}


// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById("userEnt");
    if (event.target === modal) {
        closeUser();
    }
}