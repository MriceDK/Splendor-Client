import {hideUserNamePopup, renderUsernamePopup} from "./renderer.js"

function renderPopup(){
 renderUsernamePopup();
 closePopupButton();
}

function handleClosePopup(e){
 e.preventDefault();
 hideUserNamePopup();
}

function closePopupButton() {
 document.querySelector("#close-popup").addEventListener("click", handleClosePopup);
}
export {renderPopup}


