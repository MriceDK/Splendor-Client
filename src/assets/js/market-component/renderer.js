import * as DevelopmentCardRenderer from "../development-card-component/renderer.js";

function renderMarket(gameInfo, isActive) {
    const $target= document.querySelector(".market-grid-container");

    renderLevelRows(gameInfo.market, $target);
}

function renderLevelRows(market, $target) {

    market.forEach(cardRow => {
        renderLevelCard(cardRow.level, cardRow.cardStackSize, $target);
        DevelopmentCardRenderer.renderDevelopmentCards(cardRow.visibleCards, $target);
    });

}

function renderLevelCard(level, cardStackSize, $target) {
    const $levelCard = document.querySelector("#level-card").content.firstElementChild.cloneNode(true);

    $levelCard.classList.add(`level-${level}`);
    $levelCard.setAttribute("data-level", level);
    $levelCard.querySelector(".level-title").innerText = level;
    $levelCard.querySelector(".card-amount").innerText = cardStackSize;

    $target.insertAdjacentHTML("beforeend", $levelCard.outerHTML);
}

function renderNobles(nobles){
    const $target = document.querySelector(".noble-container");

    const $template = document.querySelector(".noble").content.firstElementChild.cloneNode(true);

    nobles.forEach(noble => {

        $template.querySelector(".noble-name").innerHTML = noble.name;
        $template.querySelector(".prestige-points").innerHTML = noble.prestigePoints;
        renderBonusesInNobles(noble.neededBonuses, $template);
        
    });
    $target.insertAdjacentElement("beforeend", $template.outerHTML);

}

function renderBonusesInNobles(bonusesNeeded, $template){
    bonusesNeeded.forEach(bonusNeeded => {
        const $bonus = $template.querySelector(".bonus-cost");
        $bonus.classList.add(bonusNeeded.toLowerCase());
        $bonus.innerHTML = bonusesNeeded[bonusNeeded];
    });

}

function renderPickableNobles(nobles){
    const $allNobles = document.querySelectorAll(".noble-container .noble-name");
    nobles.forEach(noble => {
        nameChecker(noble, $allNobles)

    });

}

function nameChecker(noble, $allNobles){
    $allNobles.forEach(aNoble => {
        if (aNoble.innerHTML === noble.name){
            aNoble.classList.add("pickable-noble");
        }
    });
}
export { renderMarket, renderNobles, renderPickableNobles };