import config from "./config.js"
import { emailRegex, passwordRegex, usernameRegex } from "../utils/regex.js";
//Login Form
const loginForm = document.querySelector('#form-login');
// Email Input
const emailInput = loginForm.querySelector('#email');
// Password Inputs
const passwordInput = loginForm.querySelector('#password');
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
    let displayErr = false;
    if ( !passwordRegex.test( actualInputVal ) ) {
        if ( !displayErr ) {
            displayErr = true;
            passwordInput.classList.remove("correct-input");
            passwordInput.classList.add("wrong-input");
            pElem.innerHTML = 'Incorrect password format!';
        }
        return;
    }
    // If the password Match With the regex
    passwordInput.classList.add('correct-input');
    pElem.innerHTML = '';
    displayErr = false;
});

loginForm.addEventListener('submit', async ( e ) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    if ( !emailRegex.test( email ) ) {
        alert(`Incorrect email address:\n' ${email} ' is not a valid mail address format.`);
        return;
    }
    if ( !passwordRegex.test( password ) ) {
        alert(`Incorrect password format!`);
        return;
    }
    await fetch( config.BASE_URL + '/login', {
        method: 'POST',
        headers: {
            "Content-Type":  "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            email,
            password
        }),
    })
    .then( response => response.json() )
    .then( ( response ) => {
        if ( response.message == "success" ) {
            window.location.href = `/dashboard/${response.username}`
        } else {
            alert('Incorrect Email or Password !')
        }
    })
});