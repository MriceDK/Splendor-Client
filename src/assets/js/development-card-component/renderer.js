
function renderDevelopmentCards(cards, $target, isActive) {
    cards.forEach(card => {
        renderDevelopmentCard(card, $target, isActive);
    });
}

function renderDevelopmentCard(card, $target, isActive) {
    const $devCard = document.querySelector("#development-card").content.firstElementChild.cloneNode(true);

    if (isActive){
        $devCard.classList.remove("inactive");
        $devCard.classList.add("active");
        
    } else {
        $devCard.classList.remove("active");
        $devCard.classList.add("inactive");
    }

    $devCard.classList.add(`level-${card.level}`);
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

export {renderDevelopmentCards};