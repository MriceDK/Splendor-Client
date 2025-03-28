function hookUpEventListenerToButton(button){
    button.addEventlistener("onclick", eventDiverter());
    
}

function eventDiverter(){
    if (e.target.closest("#confirm")){


    } else if (e.target.closest("#cancel")){
        closePopUp();

    }
}

