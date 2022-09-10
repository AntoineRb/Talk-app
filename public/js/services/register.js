import config from "./config.js"
import { emailRegex, passwordRegex, usernameRegex } from "../utils/regex.js";
// Register Form
const registerForm = document.querySelector('#register-form');
// Email Input
const emailInput = registerForm.querySelector('#email');
// Username Input
const usernameInput = registerForm.querySelector('#username');
// Password Input
const passwordInput = registerForm.querySelector('#password');
const passwordConfirmInput = registerForm.querySelector('#password-confirmation');


// Email Input Event
emailInput.addEventListener('input', ( e ) => {
    e.preventDefault();
    const parentElem = e.currentTarget.parentElement;
    const inputContainer = parentElem.parentElement;
    const pElem = inputContainer.querySelector('.wrong-input-msg');
    const actualInputVal = e.currentTarget.value;
    let displayErr = false;
    // Display incorrect email err;
    if ( !emailRegex.test( actualInputVal ) ) {
        // To display error only one time
        if ( !displayErr ) {
            displayErr = true;
            emailInput.style.class = "wrong-input";
            pElem.innerHTML = 'Incorrect email address format!';
        }
        return;
    }
    document.removeChild( errElem );
    displayErr = false;
});
// Username Input Event
usernameInput.addEventListener('input', ( e ) => {
    // do something...
});
// Password Input Event
passwordInput.addEventListener('input', ( e ) => {
    // do something...
});
// Password Confirmation Input Event
passwordConfirmInput.addEventListener('input', ( e ) => {
    // do something...
});

registerForm.addEventListener('submit', async ( e ) => {
    e.preventDefault();
    const email = emailInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    if ( !emailRegex.test( email ) ) {
        // do something...
        return;
    }
    if ( !usernameRegex.test( user ) ) {
        // do something...
        return;
    }
    if ( !passwordRegex.test( password ) ) {
        // do something...
        return;
    }
    if ( password !== passwordConfirm ) {
        // do something...
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