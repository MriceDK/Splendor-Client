import * as renderer from "./renderer.js";

function openBank(){
    renderer.changeButtons();
    renderer.enableTokens();
    renderer.checkAllowedTokens();
}

function closeBank(){
    renderer.changeButtons();
    renderer.removeChosenTokens();
    renderer.checkConfirmButton();
    renderer.checkAllowedTokens();
    renderer.disableTokens();
}

function chooseBankToken(e){
    renderer.getChosenTokenColour(e);
    renderer.checkConfirmButton();
    renderer.checkAllowedTokens();
}

function removeChosenBankToken(e) {
    const className = e.target.classList[2]
    const classNameWithCapitalLetter = className.replace(className[0], className[0].toUpperCase());

    renderer.chosenBankTokens[classNameWithCapitalLetter]--;
    e.target.remove();

    renderer.updateToken(classNameWithCapitalLetter, false);
    renderer.checkConfirmButton();
    renderer.checkAllowedTokens();
}


export {openBank, closeBank, chooseBankToken, removeChosenBankToken};