function validatePassword() {
    const password = getValueByName('password');
    const passwordCheck = getValueByName('passwordCheck');

    console.log("Validating passwords...");

    if (password !== passwordCheck) {
        displayError("Passwords do not match.");
        return false;
    }

    clearError();
    return true;
}

function userExists(username, email) {
    const users = getUserDataFromStorage();

    return users.some(user => user.username === username || user.email === email);
}

function storeUserData(username, email) {
    if (userExists(username, email)) {
        displayError("Username or email already exists.");
        return;
    }

    const users = getUserDataFromStorage();
    users.push({ username, email });

    localStorage.setItem('userString', stringifyUserData(users));
}

function getValueByName(name) {
    return document.querySelector(`[name="${name}"]`).value;
}

function getUserDataFromStorage() {
    const userString = localStorage.getItem('userString') || '';
    return userString.split(';').map(user => {
        const [username, email] = user.split(',');
        return { username, email };
    });
}

function stringifyUserData(users) {
    return users.map(user => `(${user.username},${user.email})`).join(';');
}

function displayError(message) {
    setErrorDisplay(message);
}

function clearError() {
    setErrorDisplay('');
}

function setErrorDisplay(content) {
    const errorDisplay = document.getElementById('errorDisplay');
    errorDisplay.innerHTML = `<div class="error-message">${content}</div>`;
}

function validateRegistration() {
    const isValidPassword = validatePassword();

    if (!isValidPassword) {
        return false;
    }

    const username = getValueByName('username');
    const email = getValueByName('email');

    if (userExists(username, email)) {
        displayError("Username or email already exists.");
        return false;
    }

    clearError();
    storeUserData(username, email);
    return true;
}
