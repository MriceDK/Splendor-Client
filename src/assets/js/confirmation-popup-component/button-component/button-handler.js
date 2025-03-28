function hookUpEventListenerToButton(button){
    button.addEventlistener("onclick", eventDiverter(button));
    
}

function eventDiverter(action, button){
    if (e.target.closest("#confirm")){

        confirmAction(button);

    } else if (e.target.closest("#cancel")){
        closePopUp(button);

    }
}

//

function confirmAction(button){

    if (button.classList.contains("buy")){
        buyCard(cardToBuy);
    } else if (button.classList.contains("reserve")){
        reserveCardConfirmation(cardToReserve);

    }

}

function closePopUp(button){
    if (button.classList.contains("reserve")){
        reserveCard(cardToReserve);
        
    } else {
        button.classList.remove("show");
    }
}