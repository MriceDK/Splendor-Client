import {changeButtons, disableTokens, enableTokens, getChosenTokenColour, removeChosenTokens} from "./renderer.js";

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

export {openBank, closeBank, chooseBankToken};