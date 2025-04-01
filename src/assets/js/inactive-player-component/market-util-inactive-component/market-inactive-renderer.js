function renderDisableCard(card){
    card.classList.remove("active-card");
    card.classList.add("inactive-card");


}

function renderEnabledCard(){
    card.classList.remove("inactive-card");
    card.classList.add("active-card");
}