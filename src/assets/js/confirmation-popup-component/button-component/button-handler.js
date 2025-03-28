function hookUpEventListenerToButton(button, action){
    button.addEventlistener("onclick", eventDiverter(action, button));
    
}

function eventDiverter(action, button){
    if (e.target.closest("#confirm")){

        confirmAction(action);

    } else if (e.target.closest("#cancel")){
        closePopUp(button);

    }
}

function confirmAction(action){

}

function closePopUp(button){
    if (button.classList.contains("reserve")){
        reserveCard(cardToReserve);
        
    } else {
        button.classList.remove("show");
    }
}