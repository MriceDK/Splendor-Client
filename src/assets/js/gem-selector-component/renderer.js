import {buyDevelopmentCard} from "./handler.js";
import * as Utils from "../helper/utils.js";

function renderTokenSelectorForm(devCardName) {
    const $tokenSelector = document.querySelector("#token-selector").content.firstElementChild.cloneNode(true);
    devCardName = "template"; // TODO verwijder hardcoded
    Utils.showPopupContainer();

    const $target = document.querySelector(".popup-container");

    $tokenSelector.querySelector("#token-selector-dev-card").value = devCardName;

    $target.insertAdjacentHTML("beforeend", $tokenSelector.outerHTML);

    hookupEventListeners();
}

function hookupEventListeners() {
    document.querySelector("#token-selector-form").addEventListener("submit", buyDevelopmentCard);
}

export { renderTokenSelectorForm };