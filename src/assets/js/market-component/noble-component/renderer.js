
//must be gameInfo.unclaimedNobles for nobles
function renderNobles(noblesAmount, nobles){
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