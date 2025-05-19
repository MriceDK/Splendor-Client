import {hideUserNamePopup, renderUsernamePopup} from "./renderer.js"
function renderPopup(){
 renderUsernamePopup();
 closePopup()
}

function closePopup(){
 document.querySelector("#closePopup").addEventListener("click", (e) =>{
  e.preventDefault();
  console.log("closePopup");
  hideUserNamePopup();
 });
}
export {renderPopup}


