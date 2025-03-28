import * as renderer from "./renderer.js";
import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import {saveToStorage} from "../data-connector/local-storage-abstractor.js";
import {setTokenMarketValues} from "./renderer.js";

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

function getBankInfo(gameId){
    console.log(gameId);
    saveToStorage("playerToken", "27_Ruben")
    APIAbstractor.fetchFromServer(`/games/${gameId}`,"GET").then(response => setTokenMarketValues(response));
}


export {openBank, closeBank, chooseBankToken, removeChosenBankToken, getBankInfo};