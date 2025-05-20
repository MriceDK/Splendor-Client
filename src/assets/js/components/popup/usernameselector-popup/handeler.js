import {hideUserNamePopup, renderUsernamePopup} from "./renderer.js"

function renderPopup(){
 renderUsernamePopup();
 closePopupButton();
}

function closePopupButton(){
 document.querySelector("#closePopup").addEventListener("click", (e) =>{
  e.preventDefault();
  hideUserNamePopup();
 });
}
export {renderPopup}


