import * as renderer from "./renderer.js";

function openBank(){
    renderer.changeButtons();
    renderer.enableTokens();
}

function closeBank(){
    renderer.changeButtons();
    renderer.disableTokens();
    renderer.removeChosenTokens();
}

function chooseBankToken(e){
    renderer.getChosenTokenColour(e);
}

function removeChosenBankToken(e) {
    const classNameForRemoval = e.target.classList[2]

    renderer.chosenBankTokens[classNameForRemoval]--;
    e.target.remove();
}

export {openBank, closeBank, chooseBankToken, removeChosenBankToken};