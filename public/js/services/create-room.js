import config from "./config.js";
import { specialCharsRegex } from "../utils/regex.js";


const formAddRoom = document.querySelector('#form-add-room');
const roomNameInput = document.querySelector('#room-name-input');

formAddRoom.addEventListener('submit', async ( e ) => {
    e.preventDefault();
    const roomName = roomNameInput.value;
    console.log( roomName )
    if ( specialCharsRegex.test( roomName ) ) {
        return alert('Room name accept only alphanumeric characters');
    }
    if ( typeof roomName !== "string" && roomName.length >= 3 ) {
        return alert('Need a room name with 3 or more characters');
    }
    
    await fetch( config.BASE_URL + '/room', {
        method: 'POST',
        headers: {
            "Content-Type":  "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            ro_name: roomName,
        }),
    })
    .then( response => {
        if ( response.status !== 200 ) {
            alert("Cannot create room, please retry with à room name of 3 alphanumeric characters!")
        }
        return response.json();
    })
    .then( response => {
        if ( response.message === "success" ) {
            window.location.href = "/";
        }
    });
});