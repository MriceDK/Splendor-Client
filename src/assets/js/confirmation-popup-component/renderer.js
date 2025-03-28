
function renderConfirmationOverlay(){


    //$template.querySelector("#title-popup").innerText =;
    //$template.querySelector("#cancel").innerText=;
    //$template.querySelector("#confirm").innerText=;
}

const $template = document.querySelector("#confirmation-popup-template").textContent.firstElementChild.cloneNode(true);
const $target = document.querySelector(".market-grid-container");

function renderBuyDevelopmentCardPopup(){
    $template.querySelector("#title-popup").innerText = `Buy {cardName}?`;
    $template.querySelector("#cancel").innerText = `Cancel Purchase?`;
    $template.querySelector("#confirm").innerText = `Buy`;
    $target.insertAdjacentHTML("beforeend", $template.outerHTML)

}

function renderReserveDevelopmentCardPopup(){
    $template.querySelector("#title-popup").innerText = 

}
function renderBuyAndReserveDevelopmentCardPopUp(){

}