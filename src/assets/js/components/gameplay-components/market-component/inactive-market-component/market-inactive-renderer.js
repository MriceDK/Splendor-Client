function renderDisableCard(card){
    card.classList.remove("active-card");
    card.classList.add("disabled");


}

function renderEnabledCard(card){
    card.classList.remove("disabled");
    card.classList.add("active-card");
}

export {renderDisableCard, renderEnabledCard };