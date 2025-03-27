import {changeButtons, disableTokens, enableTokens, showChosenBankToken} from "./renderer.js";

function openBank(){
    changeButtons();
    enableTokens();
}

function closeBank(){
    changeButtons();
    disableTokens();
}

function chooseBankToken(e){
    showChosenBankToken(e);
}

export {openBank, closeBank, chooseBankToken};