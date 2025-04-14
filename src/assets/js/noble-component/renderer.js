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

    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

}

function renderCostBonuses(bonusesNeeded, $target){

    Object.entries(bonusesNeeded).forEach(([bonus, bonusValue]) =>
    {
        bonus = bonus.toLowerCase();
        const $costBonus = renderCostBonus(bonus, bonusValue);

        $target.insertAdjacentHTML("beforeend", $costBonus);

    });
}

function renderCostBonus(bonusNeeded, bonusValue) {
    return `<li class="${bonusNeeded}">${bonusValue}</li>`;
}

export { renderNobles };