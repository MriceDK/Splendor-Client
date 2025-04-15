import * as Utils from "../../../helper/utils.js";
import {closePopUp} from "../confirmation-popup/renderer.js";
import {buyDevelopmentCard, buyReservedDevelopmentCard} from "./handler.js";
import * as helper from "./helper.js";


const $tokenSelector = document.querySelector("#token-selector").content.firstElementChild.cloneNode(true);

function hookupEventListeners(reservedCard) {
    if (reservedCard) {
        document.querySelector("#token-selector-form").addEventListener("submit", buyReservedDevelopmentCard);

    } else if (!reservedCard) {
        document.querySelector("#token-selector-form").addEventListener("submit", buyDevelopmentCard);
    }
    document.querySelector("#token-selector-close-button").addEventListener("click", closePopUp);
}

function renderTokenSelectorForm(devCardName, reservedCard) {
    Utils.showPopupContainer();

    const $target = document.querySelector(".popup-container");

    $tokenSelector.querySelector("#token-selector-dev-card").value = devCardName;
    $target.insertAdjacentHTML("beforeend", $tokenSelector.outerHTML);
    const $form = document.querySelector("#token-selector-form");
    const costs = helper.getGemCostObject($form);
    renderCostsInPopUp(costs)

    hookupEventListeners(reservedCard);
}

function renderCostsInPopUp(costs) {

    const $target = document.querySelector("input[type='submit'][value='confirm-payment']");
    for (const gem in costs) {
        console.log("gem")
        if (costs[gem] !== 0 || costs[gem] !== null || costs[gem] !== undefined) {
            $target.insertAdjacentHTML("beforeend", `<p>cost of ${gem} is ${costs[gem]}</p>`);
        }

    }

}


export {
    renderTokenSelectorForm,
    hookupEventListeners,
    renderCostsInPopUp
};