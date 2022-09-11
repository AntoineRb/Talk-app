import config from "./config.js"
import { emailRegex, passwordRegex } from "../utils/regex.js";

const loginForm = document.querySelector('#form-login');
const emailInput = loginForm.querySelector('#email');
const passwordInput = loginForm.querySelector('#password');

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
    .then( response => {
        const statusCode = response.status;
        if ( statusCode === 500 ) {
            alert('An error has occured, you can retry!');
            window.location.reload();
        }
        if ( statusCode !== 200 ) {
            alert('Incorrect Email or Password !!');
        }
        return response.json();
    })
    .then(( response ) => {
        if ( response.message === 'success' ) {
            window.location.href = `/dashboard/${response.username}`
        }
    });
});