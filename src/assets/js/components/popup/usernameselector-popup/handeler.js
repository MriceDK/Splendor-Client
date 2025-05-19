import {hideUserNamePopup, renderUsernamePopup} from "./renderer.js"

function renderPopup(){
 renderUsernamePopup();
 closePopup()
}

function closePopup(){
 document.querySelector("#closePopup").addEventListener("click", (e) =>{
  e.preventDefault();
  hideUserNamePopup();
 });
}
export {renderPopup}


