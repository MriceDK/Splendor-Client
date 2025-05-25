import * as Utils from "../../../helper/utils.js";
import {closePopUp} from "../confirmation-popup/renderer.js";
import {checkIfPaymentIsValidForConfirm, getDevelopment} from "./handler.js";
import * as helper from "./helper.js";
const $tokenSelector = document.querySelector("#token-selector").content.firstElementChild.cloneNode(true);

const TOKEN_VALES = ["ruby", "emerald", "onyx", "sapphire", "diamond"];

function hookupEventListeners(reservedCard) {
    if (reservedCard) {
        document.querySelector("#token-selector-form").addEventListener("submit", e => getDevelopment(e, true));

    } else if (!reservedCard) {
        document.querySelector("#token-selector-form").addEventListener("submit", e => getDevelopment(e, false));
    }
    document.querySelector("#token-selector-close-button").addEventListener("click", closePopUp);
    document.querySelectorAll(".gem-selector-input").forEach(input => {input.addEventListener("input", checkIfPaymentIsValidForConfirm)});
}

function renderTokenSelectorForm(devCardName, reservedCard) {
    Utils.showPopupContainer();

    const $target = document.querySelector(".popup-container");

    $tokenSelector.querySelector("#token-selector-dev-card").value = devCardName;
    $target.insertAdjacentHTML("beforeend", $tokenSelector.outerHTML);

    const $devCard = document.querySelector(`article.development-card[data-card-name="${devCardName}"]`);
    const devCardValues =  getCostFromDevelopmentCard($devCard);
    putInitialBuyValueInForm(devCardValues);
    renderCostsInPopUp(devCardValues);
    renderOwnTokenValuesInGems();
    checkIfPaymentIsValidForConfirm();

    hookupEventListeners(reservedCard);
}

function renderCostsInPopUp(costs) {
    Object.entries(costs).forEach((cost) => {
        const $target = document.querySelector(`#token-selector-form .${cost[0]}-cost`);
        const costWithBonuses = helper.calculateNeededDevelopmentCost(cost[1], cost[0]);

        $target.insertAdjacentHTML("beforeend", `<p>/${costWithBonuses}</p>`);
    });
}

function putInitialBuyValueInForm(devCardValues) {
    const $allInputs = document.querySelectorAll("#token-selector-form input.gem-selector-input");
    const ownTokenValueGold = parseInt(document.querySelector(`.own-inventory .gold .gem-value`).innerText);

    $allInputs.forEach((input) => {
        TOKEN_VALES.forEach((token) => {
            if (input.getAttribute("name") === token){
                if (!isNaN(devCardValues[token])){
                    input.setAttribute("value", helper.calculatePossibleDevelopmentCost(devCardValues[token], token));
                    input.setAttribute("max", helper.calculatePossibleDevelopmentCost(devCardValues[token], token));
                } else {
                    input.closest(".gem-chooser").classList.add("hidden");
                }
            }
        });

        if (input.getAttribute("name") === "gold") {
            input.setAttribute("max", ownTokenValueGold);
        }
    });
}

function getCostFromDevelopmentCard($devCard){
    const $values = $devCard.querySelectorAll("li.gem");
    const returnObj = {};
    TOKEN_VALES.forEach((token) => {
        $values.forEach(($value) => {
            if ($value.classList.contains(token)) {
                returnObj[token] = $value.innerText;

            }
        });

    });

    return returnObj;
}

function renderOwnTokenValuesInGems() {
    const $ownPurse = document.querySelectorAll(".user-info-flexcontainer .own-inventory");

    $ownPurse.forEach((tokenValues) => {
        const token = tokenValues.querySelector(".gem").classList[1];

        document.querySelector(`.popup-token-selector .inventory .${token} .gem-value`).innerText = tokenValues.querySelector(".gem-value").innerText;
    });
}

export {
    renderTokenSelectorForm,
    hookupEventListeners,
    renderCostsInPopUp,
    getCostFromDevelopmentCard
};