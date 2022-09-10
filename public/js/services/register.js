import config from "./config.js"
import { emailRegex, passwordRegex, usernameRegex } from "../utils/regex.js";
// Register Form
const registerForm = document.querySelector('#register-form');
// Username Input
const usernameInput = registerForm.querySelector('#username');
// Email Input
const emailInput = registerForm.querySelector('#email');
// Password Inputs
const passwordInput = registerForm.querySelector('#password');
const passwordConfirmInput = registerForm.querySelector('#password-confirmation');

// Username Input Event
usernameInput.addEventListener('input', ( e ) => {
    e.preventDefault();
    const inputContainer = e.currentTarget.parentElement.parentElement;
    const pElem = inputContainer.querySelector('.wrong-input-msg');
    const actualInputVal = e.currentTarget.value;
    let displayErr = false;
    // Display incorrect Username err;
    if ( !usernameRegex.test( actualInputVal ) ) {
        // To display error only one time
        if ( !displayErr ) {
            displayErr = true;
            usernameInput.classList.remove("correct-input");
            usernameInput.classList.add("wrong-input");
            pElem.innerHTML = 'Incorrect username format!';
        }
        return;
    }
    usernameInput.classList.add('correct-input');
    pElem.innerHTML = '';
    displayErr = false;
});

// Email Input Event
emailInput.addEventListener('input', ( e ) => {
    e.preventDefault();
    const inputContainer = e.currentTarget.parentElement.parentElement;
    const pElem = inputContainer.querySelector('.wrong-input-msg');
    const actualInputVal = e.currentTarget.value;
    let displayErr = false;
    if ( !emailRegex.test( actualInputVal ) ) {
        if ( !displayErr ) {
            displayErr = true;
            emailInput.classList.remove("correct-input");
            emailInput.classList.add("wrong-input");
            pElem.innerHTML = 'Incorrect email address format!';
        }
        return;
    }
    emailInput.classList.add('correct-input');
    pElem.innerHTML = '';
    displayErr = false;
});

// Password Input Event
passwordInput.addEventListener('input', ( e ) => {
    e.preventDefault();
    const inputContainer = e.currentTarget.parentElement.parentElement;
    const pElem = inputContainer.querySelector('.wrong-input-msg');
    const actualInputVal = e.currentTarget.value;
    const confirmPwdVal = passwordConfirmInput.value;
    let displayErr = false;
    if ( !passwordRegex.test( actualInputVal ) ) {
        if ( !displayErr ) {
            displayErr = true;
            passwordInput.classList.remove("correct-input");
            passwordInput.classList.add("wrong-input");
            pElem.innerHTML = 'Incorrect password address format!';
        }
    }
    // If the password dont match with confirmation input
    if ( actualInputVal !== confirmPwdVal ) {
        passwordConfirmInput.classList.remove("correct-input");
        passwordConfirmInput.classList.add("wrong-input");
    }
    if ( displayErr ) return;
    // If the password Match With the regex
    passwordInput.classList.add('correct-input');
    pElem.innerHTML = '';
    displayErr = false;
    // If the password match with the confirmation input
    if ( actualInputVal === confirmPwdVal ) {
        passwordConfirmInput.classList.remove("wrong-input");
        passwordConfirmInput.classList.add("correct-input");
    }
});

// Password Confirmation Input Event
passwordConfirmInput.addEventListener('input', ( e ) => {
    e.preventDefault();
    const inputContainer = e.currentTarget.parentElement.parentElement;
    const pElem = inputContainer.querySelector('.wrong-input-msg');
    const actualInputVal = e.currentTarget.value;
    const passwordVal = document.getElementById('password').value;
    let displayErr = false;
    if ( actualInputVal !== passwordVal ) {
        if ( !displayErr ) {
            displayErr = true;
            passwordConfirmInput.classList.remove("correct-input");
            passwordConfirmInput.classList.add("wrong-input");
            pElem.innerHTML = 'Password not matching !';
        }
        return;
    }
    passwordConfirmInput.classList.remove("wrong-input")
    passwordConfirmInput.classList.add('correct-input');
    pElem.innerHTML = '';
    displayErr = false;
});

registerForm.addEventListener('submit', async ( e ) => {
    e.preventDefault();
    const email = emailInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    if ( !usernameRegex.test( username ) ) {
        alert(`Incorrect username :\n'${username}' is not a valid username.`);
        return; 
    }
    if ( !emailRegex.test( email ) ) {
        alert(`Incorrect email address:\n'${email}' is not a valid mail address.`);
        return;
    }
    if ( !passwordRegex.test( password ) ) {
        alert(`Incorrect password format!`);
        return;
    }
    if ( password !== passwordConfirm ) {
        alert(`Password dont match with the confirmation!`);
        return; 
    }
    await fetch( config.BASE_URL + '/register', {
        method: 'POST',
        headers: {
            "Content-Type":  "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            login: {
                log_email: email,
                log_password: password,
            }, 
            user: {
                username
            }
        }),
    })
    .then( response => response.json() )
    .then( ( response ) => {
        if ( response.message == "success" ) {
            window.location.href = `/dashboard/${response.username}`
        }
    })
});