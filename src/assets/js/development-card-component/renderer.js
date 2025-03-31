
function renderDevelopmentCard(card, $target) {
    const $devCard = document.querySelector("#development-card").content.firstElementChild.cloneNode(true);

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
        console.log(gem);
        const $costToken = renderCostToken(gem, value);
        console.log($costToken);

        $target.insertAdjacentHTML("beforeend", $costToken);
    }
}

function renderCostToken(gem, amount) {
    return `<span class="gem-cost ${gem}">${amount}</span>`
}

export {renderDevelopmentCard};