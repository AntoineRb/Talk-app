import config from "./config.js"
import { emailRegex, passwordRegex, usernameRegex } from "../utils/regex.js";

const registerForm = document.querySelector('.register-form');

registerForm.addEventListener('submit', async ( e ) => {
    e.preventDefault();
    const email = registerForm.querySelector('#email').value;
    const username = registerForm.querySelector('#username').value;
    const password = registerForm.querySelector('#password').value;
    const passwordConfirm = registerForm.querySelector('#password-confirmation').value;
    if ( !emailRegex.test( email ) ) {
        // do something...
    }
    if ( !usernameRegex.test( user ) ) {
        // do something...
    }
    if ( !passwordRegex.test( password ) ) {
        // do something...
    }
    if ( password !== passwordConfirm ) {
        // do something...
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