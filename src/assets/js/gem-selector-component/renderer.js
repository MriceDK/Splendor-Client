import {buyDevelopmentCard} from "./handler.js";
import * as Utils from "../helper/utils.js";
import {closePopUp} from "../confirmation-popup-component/handler.js";

const $tokenSelector = document.querySelector("#token-selector").content.firstElementChild.cloneNode(true);

function renderTokenSelectorForm(devCardName) {
    Utils.showPopupContainer();

    const $target = document.querySelector(".popup-container");

    $tokenSelector.querySelector("#token-selector-dev-card").value = devCardName;
    $target.insertAdjacentHTML("beforeend", $tokenSelector.outerHTML);

    hookupEventListeners();
}

function hookupEventListeners() {
    document.querySelector("#token-selector-form").addEventListener("submit", buyDevelopmentCard);
    document.querySelector("#token-selector-close-button").addEventListener("click", closePopUp);
}

export { renderTokenSelectorForm };