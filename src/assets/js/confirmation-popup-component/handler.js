/*
things that need confirmation

- buy and reserve development 
- buy confirm after token selection (if necessary)
- reserve confirmation
*/

function handleClickOnCard(e) {

    if (e.target.classList.contains("reserved") && !e.target.classList.contains("disabled")) {
        const cardName = e.target.dataset.cardName;
        render.renderBuyDevelopmentCardPopup(cardName);

    } else if (e.target.classList.contains("deck") && !e.target.classList.contains("disabled")) {
        render.renderReserveDevelopmentCardPopup();

    } else if (e.target.classList.contains("development-card") && !e.target.classList.contains("disabled")) {
        const cardName = e.target.dataset.cardName;
        render.renderBuyAndReserveDevelopmentCardPopUp(cardName);
    }
}

export { getClickForPopUpOrigin }