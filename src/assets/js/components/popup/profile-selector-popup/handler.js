import {hideProfilePopup, renderProfilePopup} from "./renderer.js"

function renderPopup(){
 renderProfilePopup();
 closePopupButton();
}

function handleClosePopup(e){
 e.preventDefault();
 hideProfilePopup();
}

function closePopupButton() {
 document.querySelector("#close-popup").addEventListener("click", handleClosePopup);
}
export {renderPopup}


