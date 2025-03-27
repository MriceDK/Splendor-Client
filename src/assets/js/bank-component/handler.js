import {changeButtons, disableTokens, enableTokens, getChosenTokenColour, removeChosenTokens, resetChosenTokenList, chosenBankTokens} from "./renderer.js";

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
    chosenBankTokens.splice(chosenBankTokens.indexOf(e.target.classList[2]), 1);
    e.target.remove();
}

export {openBank, closeBank, chooseBankToken, removeChosenBankToken};