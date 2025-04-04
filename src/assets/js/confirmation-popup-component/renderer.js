
//$template.querySelector("#title-popup").innerText =;    
//$template.querySelector("#cancel").innerText=;
//$template.querySelector("#confirm").innerText=;



function renderBuyDevelopmentCardPopup(cardName){
    const $template = document.querySelector("#confirmation-popup-template").content.firstElementChild.cloneNode(true);
    let $target = document.querySelector("#confirmation-pop-up-result");
    $target.innerHTML = "";

    document.querySelector(".popup-container").classList.remove("hidden");
    document.querySelector(".popup-container").setAttribute("data-pop-up-type", "buy-pop-up");
    $template.querySelector("#title-popup").innerText = `Buy ${cardName}?`;
    $template.querySelector("#cancel-pop-up-button").innerText = `Cancel Purchase`;
    $template.querySelector("#confirm-pop-up-button").innerText = `Buy`;
    $template.querySelector("#close-popup-button").classList.add("hidden");
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

}

function renderReserveDevelopmentCardPopup(cardLevel){
    const $template = document.querySelector("#confirmation-popup-template").content.firstElementChild.cloneNode(true);
    let $target = document.querySelector("#confirmation-pop-up-result");
    $target.innerHTML = "";

    document.querySelector(".popup-container").classList.remove("hidden");
    document.querySelector(".popup-container").setAttribute("data-pop-up-type", "reserve-pop-up");

    $template.querySelector("#title-popup").innerText = `Reserve card from level ${cardLevel}?`;
    $template.querySelector("#cancel-pop-up-button").classList.add("hidden");
    $template.querySelector("#confirm-pop-up-button").innerText = `Reserve`;
    
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);
}
function renderBuyAndReserveDevelopmentCardPopUp(cardName){
    const $template = document.querySelector("#confirmation-popup-template").content.firstElementChild.cloneNode(true);
    let $target = document.querySelector("#confirmation-pop-up-result");

    $target.innerHTML = "";

    document.querySelector(".popup-container").classList.remove("hidden");
    document.querySelector(".popup-container").setAttribute("data-pop-up-type", "buy-and-reserve-pop-up");

    $template.querySelector("#title-popup").innerText = `Buy or Reserve ${cardName}?`;

    $template.querySelector("#cancel-pop-up-button").classList.add("reserve");
    $template.querySelector("#cancel-pop-up-button").classList.remove("hidden");
    $template.querySelector("#cancel-pop-up-button").innerText = `Reserve`;
    $template.querySelector("#confirm-pop-up-button").innerText = `Buy`;

    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

}

function closePopUp(){
    document.querySelector(".popup-container").classList.add("hidden");
    document.querySelector(".popup-container").removeAttribute("data-pop-up-type");
    document.querySelector("#confirmation-pop-up-result").innerHTML = "";
    document.querySelector("#confirmation-pop-up-result").classList.add("hidden");

    if (document.querySelector(".popup-token-selector")) {
        document.querySelector(".popup-token-selector").outerHTML = "";
    }
}

export { renderBuyAndReserveDevelopmentCardPopUp, renderBuyDevelopmentCardPopup, renderReserveDevelopmentCardPopup, closePopUp}
