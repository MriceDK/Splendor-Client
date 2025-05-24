import * as Utils from "../../../helper/utils.js";
import {closePopUp} from "../confirmation-popup/renderer.js";
import {buyDevelopmentCard, buyReservedDevelopmentCard, checkIfPaymentIsValidForConfirm} from "./handler.js";
import * as helper from "./helper.js";
const $tokenSelector = document.querySelector("#token-selector").content.firstElementChild.cloneNode(true);

const TOKEN_VALES = ["ruby", "emerald", "onyx", "sapphire", "diamond"];

function hookupEventListeners(reservedCard) {
    if (reservedCard) {
        document.querySelector("#token-selector-form").addEventListener("submit", buyReservedDevelopmentCard);

    } else if (!reservedCard) {
        document.querySelector("#token-selector-form").addEventListener("submit", buyDevelopmentCard);
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
    const ownTokenValue = parseInt(document.querySelector(`.own-inventory .gold .gem-value`).innerHTML);

    $allInputs.forEach((input) => {
        TOKEN_VALES.forEach((token) => {
            if (input.getAttribute("name") === token){
                if (!isNaN(devCardValues[token])){
                    input.setAttribute("value", helper.calculatePossibleDevelopmentCost(devCardValues[token], token));
                    input.setAttribute("max", helper.calculateNeededDevelopmentCost(devCardValues[token], token));
                } else {
                    input.closest(".gem-chooser").classList.add("hidden");
                }
            }
        });

        if (input.getAttribute("name") === "gold") {
            input.setAttribute("max", ownTokenValue);
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

        document.querySelector(`.popup-token-selector .inventory .${token} .gem-value`).innerHTML = tokenValues.querySelector(".gem-value").innerHTML;

        if (token !== "gold") {
            document.querySelector(`.popup-token-selector .inventory .${token} .card-text`).innerHTML = tokenValues.querySelector(".card-text").innerHTML;
        }
    });
}

export {
    renderTokenSelectorForm,
    hookupEventListeners,
    renderCostsInPopUp,
    getCostFromDevelopmentCard
};