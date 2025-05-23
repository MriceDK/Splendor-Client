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

    const $devCard = document.querySelector(`article.development-card[data-card-name="${devCardName}"]`);
    const devCardValues =  getCostFromDevelopmentCard($devCard);
    putInitalBuyValueInForm(devCardValues);
    renderCostsInPopUp(devCardValues);

    hookupEventListeners(reservedCard);
}

function renderCostsInPopUp(costs) {
    Object.entries(costs).forEach((cost) => {
        const $target = document.querySelector(`#token-selector-form .${cost[0]}-cost`);
        const costWithBonuses = helper.calculateNeededDevelopmentCost(cost[1], cost[0]);

        $target.insertAdjacentHTML("beforeend", `<p>/${costWithBonuses}</p>`);
    });
}

function putInitalBuyValueInForm(devCardValues) {
    const tokenArray = ["emerald", "ruby", "sapphire", "diamond", "onyx"];
    const $allInputs = document.querySelectorAll("#token-selector-form input.gem-selector-input");

    $allInputs.forEach((input) => {
        tokenArray.forEach((token) => {
            if (input.getAttribute("name") === token){
                if (!isNaN(devCardValues[token])){
                    input.setAttribute("value", helper.calculatePossibleDevelopmentCost(devCardValues[token], token));
                    input.setAttribute("max", helper.calculateNeededDevelopmentCost(devCardValues[token], token));
                } else {
                    input.closest(".gem-chooser").classList.add("hidden");
                }
            }
        });

    });
}

function getCostFromDevelopmentCard($devCard){
    const tokenArray = ["ruby", "diamond", "sapphire", "emerald", "onyx"];
    const $values = $devCard.querySelectorAll("li.gem");
    const returnObj = {};
    tokenArray.forEach((token) => {
        $values.forEach(($value) => {
            if ($value.classList.contains(token)) {
                returnObj[token] = $value.innerText;

            }
        });

    });

    return returnObj;
}

export {
    renderTokenSelectorForm,
    hookupEventListeners,
    renderCostsInPopUp,
    getCostFromDevelopmentCard
};