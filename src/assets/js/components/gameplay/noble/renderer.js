import {convertToKebabCase} from "../../../helper/utils.js";

const MAX_NOBLE_DISPLAY = 5;

function renderNobles(nobles, $target) {
    nobles.forEach(noble => {
        renderNoble(noble, $target);
    })
}

function renderNoble(noble, $target){
    const $template = document.querySelector("#noble").content.firstElementChild.cloneNode(true);

    $template.querySelector(".noble-name").innerHTML = noble.name;
    $template.querySelector(".prestige-point").innerHTML = noble.prestigePoints;

    const $bonusCost = $template.querySelector(".bonus-costs");
    renderCostBonuses(noble.neededBonuses, $bonusCost);
    $template.style.backgroundImage = `url("assets/images/noble-images/${convertToKebabCase(noble.name)}.jpg")`;

    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

}

function renderCostBonuses(bonusesNeeded, $target){

    Object.entries(bonusesNeeded).forEach(([bonus, bonusValue]) =>
    {
        bonus = bonus.toLowerCase();
        const $costBonus = generateCostBonus(bonus, bonusValue);

        $target.insertAdjacentHTML("beforeend", $costBonus);

    });
}

function generateCostBonus(bonusNeeded, bonusValue) {
    return `<li class="bonus-cost ${bonusNeeded}"><span>${bonusValue}</span></li>`;
}

function renderEmptyNobleSpots($target) {

    const $childItems = $target.querySelectorAll(".noble-article");

    if ($childItems.length < MAX_NOBLE_DISPLAY) {

        const $emptyNobleSpot = `<article class="noble-article empty"></article>`;
        $target.insertAdjacentHTML("beforeend", $emptyNobleSpot);

        renderEmptyNobleSpots($target);
    }

}

export { renderNobles, renderEmptyNobleSpots };