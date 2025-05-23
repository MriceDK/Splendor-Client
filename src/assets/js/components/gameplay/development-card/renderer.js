import {buyableDevCards} from "../../../game.js";
import * as Helper from "../../../helper/utils.js";

const MAX_RESERVED_CARDS = 3;

function renderDevelopmentCards(cards, $target, isReserved = false) {
    cards.forEach(card => {
        renderDevelopmentCard(card, $target, isReserved);
    });
}

function renderDevelopmentCard(card, $target, isReserved = false) {
    const $devCard = document.querySelector("#development-card").content.firstElementChild.cloneNode(true);

    $devCard.classList.add(`level-${card.level}`);
    isReserved ? $devCard.classList.add("reserved"): null;
    $devCard.setAttribute("data-card-name", card.name);
    $devCard.querySelector("h2").innerText = card.name;
    $devCard.querySelector(".prestige-point").innerText = card.prestigePoints;
    $devCard.querySelector(".bonus").classList.add(card.bonus.toLowerCase());
    $devCard.style.backgroundImage = `url("/src/images/development-card-images/${card.name}.jpg")`;

    const $devCardCostGemCollection = $devCard.querySelector(".gem-costs");
    renderCostGems(card.cost, $devCardCostGemCollection);

    $target.insertAdjacentHTML("beforeend", $devCard.outerHTML);
}

function renderCostGems(cost, $target) {
    for (const [key, value] of Object.entries(cost)) {

        const gem = key.toLowerCase();
        const $costGem = renderCostGem(gem, value);

        $target.insertAdjacentHTML("beforeend", $costGem.outerHTML);
    }
}

function renderCostGem(gem, amount) {
    const $template = document.querySelector("#token").content.firstElementChild.cloneNode(true);

    $template.classList.add(gem);
    $template.querySelector(".gem-value").innerText = amount;

    return $template;
}

function renderEmptyDevelopmentCardSpots($target) {

    const $childItems = $target.querySelectorAll(".development-card");

    if ($childItems.length < MAX_RESERVED_CARDS) {

        const $emptyNobleSpot = `<article class="development-card empty"></article>`;
        $target.insertAdjacentHTML("beforeend", $emptyNobleSpot);

        renderEmptyDevelopmentCardSpots($target);

    }

}

function renderDisableCard(card) {
    card.classList.remove("active-card");
    card.classList.add("disabled");
}

function renderEnabledCard(card) {
    card.classList.remove("disabled");
    card.classList.add("active-card");
}

function renderBuyableCards() {
    const $developmentCards = document.querySelectorAll(".development-card");

    $developmentCards.forEach($card => {

        if (Helper.elementIsInArray(buyableDevCards, $card.dataset.cardName)) {
            renderBuyableCard($card);
        }

    })
}

function renderBuyableCard($card) {
    $card.classList.add("buyable");
}

export {renderDevelopmentCards, renderEmptyDevelopmentCardSpots, renderEnabledCard, renderDisableCard, renderBuyableCards, MAX_RESERVED_CARDS};