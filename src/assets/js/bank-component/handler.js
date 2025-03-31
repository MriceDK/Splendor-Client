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
    const className = e.target.classList[2]
    const classNameWithCapitalLetter = className.replace(className[0], className[0].toUpperCase());

    renderer.chosenBankTokens[classNameWithCapitalLetter]--;
    e.target.remove();
    renderer.updateToken(classNameWithCapitalLetter, false);
}


export {openBank, closeBank, chooseBankToken, removeChosenBankToken};