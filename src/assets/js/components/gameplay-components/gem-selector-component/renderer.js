import {buyDevelopmentCard, buyReservedDevelopmentCard} from "./handler.js";
import * as Utils from "../../../helper/utils.js";
import {closePopUp} from "../confirmation-popup-component/renderer.js";

const $tokenSelector = document.querySelector("#token-selector").content.firstElementChild.cloneNode(true);

function renderTokenSelectorForm(devCardName, reservedCard) {
    Utils.showPopupContainer();

    const $target = document.querySelector(".popup-container");

    $tokenSelector.querySelector("#token-selector-dev-card").value = devCardName;
    $target.insertAdjacentHTML("beforeend", $tokenSelector.outerHTML);

    hookupEventListeners(reservedCard);
}

function hookupEventListeners(reservedCard) {
    if (reservedCard) {
        document.querySelector("#token-selector-form").addEventListener("submit", buyReservedDevelopmentCard);

    } else if (!reservedCard) {
        document.querySelector("#token-selector-form").addEventListener("submit", buyDevelopmentCard);
    }
    document.querySelector("#token-selector-close-button").addEventListener("click", closePopUp);
}

export {renderTokenSelectorForm};