function renderDevelopmentCards(cards, $target) {
    cards.forEach(card => {
        renderDevelopmentCard(card, $target);
    });
}

function renderDevelopmentCard(card, $target) {
    const $devCard = document.querySelector("#development-card").content.firstElementChild.cloneNode(true);

    $devCard.classList.add(`level-${card.level}`);
    $devCard.setAttribute("data-card-name", card.name);
    $devCard.querySelector("h2").innerText = card.name;
    $devCard.querySelector(".prestige-point").innerText = card.prestigePoints;
    $devCard.querySelector("img").setAttribute("alt", card.bonus);

    const $devCardCostGemCollection = $devCard.querySelector(".gem-costs");
    renderCostGems(card.cost, $devCardCostGemCollection);

    $target.insertAdjacentHTML("beforeend", $devCard.outerHTML);
}

function renderCostGems(cost, $target) {
    for (const [key, value] of Object.entries(cost)) {

        const gem = key.toLowerCase();
        const $costGem = renderCostGem(gem, value);

        $target.insertAdjacentHTML("beforeend", $costGem);
    }
}

function renderCostGem(gem, amount) {
    return `<span class="gem-cost ${gem}">${amount}</span>`;
}

function renderEmptyDevelopmentCardSpots($target) {

    const $childItems = $target.querySelectorAll(".development-card");

    if ($childItems.length < 3) {

        const $emptyNobleSpot = `<article class="development-card empty"></article>`;
        $target.insertAdjacentHTML("beforeend", $emptyNobleSpot);

        renderEmptyDevelopmentCardSpots($target);

    }

}

export {renderDevelopmentCards, renderEmptyDevelopmentCardSpots};