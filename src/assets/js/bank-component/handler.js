import {changeButtons, disableTokens, enableTokens, getChosenTokenColour, removeChosenTokens, chosenBankTokens} from "./renderer.js";

function openBank(){
    changeButtons();
    enableTokens();
}

function closeBank(){
    changeButtons();
    disableTokens();
    removeChosenTokens();
}

function chooseBankToken(e){
    getChosenTokenColour(e);
}

function removeChosenBankToken(e) {
    chosenBankTokens[e.target.classList[2]]--;
    e.target.remove();
    //TODO Code-Cleanup (remove hardcoded parts)
}

export {openBank, closeBank, chooseBankToken, removeChosenBankToken};