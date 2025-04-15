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
    const $form = document.querySelector("#token-selector-form");
    const costs = helper.getGemCostObject($form);
    renderCostsInPopUp(costs)

    hookupEventListeners(reservedCard);
}

function renderCostsInPopUp(costs) {

    const $target = document.querySelector("input[type='submit'][value='confirm-payment']");
    $target.insertAdjacentHTML("beforeend", `<p>The costs are:</p>`);
    for (const gem in costs) {
        console.log(gem);
        console.log(costs[gem]);

        if (costs[gem] !== 0 || costs[gem] !== null || costs[gem] !== undefined) {
            $target.insertAdjacentHTML("beforeend", `<p>cost of ${gem} is ${costs[gem]}</p>`);
        }

    }

}

function putInitalBuyValueInForm(devCardValues) {
    const tokenArray = ["emerald", "ruby", "sapphire", "diamond", "onyx"];
    const $allInputs = document.querySelectorAll("#token-selector-form input.gem-selector-input");
    console.log($allInputs);
    $allInputs.forEach((input) => {
        tokenArray.forEach((token) => {

            console.log(input);

            if (input.getAttribute("name") === token){
                input.setAttribute("value", devCardValues[token]);


            }
        })

    })
}


function getCostFromDevelopmentCard($devCard){
    const tokenArray = ["ruby", "diamond", "sapphire", "emerald", "onyx"];
    const $values = $devCard.querySelectorAll("span.gem-cost");
    const returnObj = {};
    tokenArray.forEach((token) => {
        $values.forEach(($value) => {
            if ($value.classList.contains(token)) {
                returnObj[token] = $value.innerText;

            } else {
                returnObj[token] = 0;
            }
        })

    })

    return returnObj;
}

export {
    renderTokenSelectorForm,
    hookupEventListeners,
    renderCostsInPopUp
};