
//$template.querySelector("#title-popup").innerText =;    
//$template.querySelector("#cancel").innerText=;
//$template.querySelector("#confirm").innerText=;

const $template = document.querySelector("#confirmation-popup-template").textContent.firstElementChild.cloneNode(true);
const $target = document.querySelector(".market-grid-container");
const $template = document.querySelector("#confirmation-popup-template").content.firstElementChild.cloneNode(true);
let $target = document.querySelector("#confirmation-pop-up-result");

function renderBuyDevelopmentCardPopup(){
    $target.innerHTML = "";

    $template.querySelector("#title-popup").innerText = `Buy {cardName}?`;
    $template.querySelector("#cancel").innerText = `Cancel Purchase?`;
    $template.querySelector("#confirm").innerText = `Buy`;

    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

}

function renderReserveDevelopmentCardPopup(){
    $target.innerHTML = "";

    $template.querySelector("#title-popup").innerText = `Reserve {cardName}?`;
    $template.querySelector("#cancel").innerText = `Cancel Reservation`;
    $template.querySelector("#confirm").innerText = `Reserve {cardName}`;
    
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

}
function renderBuyAndReserveDevelopmentCardPopUp(){

    $target.innerHTML = "";
    $template.querySelector("#title-popup").innerText = `Buy or Reserve {cardName}?`;

    $template.querySelector("#cancel").classList.add("reserve");
    $template.querySelector("#cancel").innerText = `Reserve`;
    $template.querySelector("#confirm").innerText = `Buy`;

    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

}