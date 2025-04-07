import * as renderer from "./renderer.js";

function openBank(){
    renderer.changeButtons();
    renderer.enableTokens();
}

function closeBank(){
    renderer.changeButtons();
    renderer.disableTokens();
    renderer.removeChosenTokens();
    renderer.checkConfirmButton();
}

function chooseBankToken(e){
    renderer.getChosenTokenColour(e);
    renderer.checkConfirmButton();
}

function removeChosenBankToken(e) {
    const className = e.target.classList[2]
    const classNameWithCapitalLetter = className.replace(className[0], className[0].toUpperCase());

    renderer.chosenBankTokens[classNameWithCapitalLetter]--;
    e.target.remove();
    renderer.updateToken(classNameWithCapitalLetter, false);
    renderer.checkConfirmButton();
}


export {openBank, closeBank, chooseBankToken, removeChosenBankToken};