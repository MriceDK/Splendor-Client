import {removeChosenBankToken} from "./handler.js";
import * as handler from "./handler.js";

const chosenBankTokens = {
    ruby: 0,
    emerald: 0,
    onyx: 0,
    sapphire: 0,
    diamond: 0,
};
const currentBankTokens = {
    Ruby: 0,
    Emerald: 0,
    Onyx: 0,
    Sapphire: 0,
    Diamond: 0,
};

function renderTokenBank(gameInfo) {
    disableTokens();
    toggleTokenBorders();
    setTokenMarketValues(gameInfo);

    hoopUpEvents();
}

function hoopUpEvents() {
    document.querySelector(".bank-buttons .take-gems-button").addEventListener("click", handler.openBank);
    document.querySelector(".bank-buttons .cancel-button").addEventListener("click", handler.closeBank);
    document.querySelectorAll(".token-bank button").forEach(button => button.addEventListener("click", handler.chooseBankToken));
}

function changeButtons(){
    document.querySelector(".bank-buttons .cancel-button").classList.toggle("hidden");
    document.querySelector(".bank-buttons .cancel-button").classList.toggle("clickable");
    document.querySelector(".bank-buttons .take-gems-button").classList.toggle("hidden");
    document.querySelector(".bank-buttons .take-gems-button").classList.toggle("clickable");
    document.querySelector(".bank-buttons .collect-gems-button").classList.toggle("hidden");
    document.querySelector(".bank-buttons .collect-gems-button").classList.toggle("clickable");
}

function enableTokens(){
    document.querySelector(".token-bank .ruby").disabled = false;
    document.querySelector(".token-bank .emerald").disabled = false;
    document.querySelector(".token-bank .onyx").disabled = false;
    document.querySelector(".token-bank .sapphire").disabled = false;
    document.querySelector(".token-bank .diamond").disabled = false;
    toggleTokenBorders();
}

function disableTokens(){
    document.querySelector(".token-bank .ruby").disabled = true;
    document.querySelector(".token-bank .emerald").disabled = true;
    document.querySelector(".token-bank .onyx").disabled = true;
    document.querySelector(".token-bank .sapphire").disabled = true;
    document.querySelector(".token-bank .diamond").disabled = true;
    document.querySelector(".token-bank .gold").disabled = true;
    toggleTokenBorders();
}

function toggleTokenBorders(){
    document.querySelector(".token-bank .ruby").classList.toggle("clickable");
    document.querySelector(".token-bank .emerald").classList.toggle("clickable");
    document.querySelector(".token-bank .onyx").classList.toggle("clickable");
    document.querySelector(".token-bank .sapphire").classList.toggle("clickable");
    document.querySelector(".token-bank .diamond").classList.toggle("clickable");
}


function setTokenMarketValues(gameInfo){
    currentBankTokens.Ruby = gameInfo.unclaimedTokens.Ruby;
    currentBankTokens.Emerald = gameInfo.unclaimedTokens.Emerald;
    currentBankTokens.Onyx = gameInfo.unclaimedTokens.Onyx;
    currentBankTokens.Sapphire = gameInfo.unclaimedTokens.Sapphire;
    currentBankTokens.Diamond = gameInfo.unclaimedTokens.Diamond;

    document.querySelector(".token-bank .ruby").innerHTML = gameInfo.unclaimedTokens.Ruby;
    document.querySelector(".token-bank .emerald").innerHTML = gameInfo.unclaimedTokens.Emerald;
    document.querySelector(".token-bank .onyx").innerHTML = gameInfo.unclaimedTokens.Onyx;
    document.querySelector(".token-bank .sapphire").innerHTML = gameInfo.unclaimedTokens.Sapphire;
    document.querySelector(".token-bank .diamond").innerHTML = gameInfo.unclaimedTokens.Diamond;
    document.querySelector(".token-bank .gold").innerHTML = gameInfo.unclaimedTokens.Gold;
}

function getChosenTokenColour(e){
    if(e.target.classList.contains("ruby")){
        showChosenBankToken("Ruby");
    } else if (e.target.classList.contains("emerald")){
        showChosenBankToken("Emerald");
    } else if (e.target.classList.contains("onyx")){
        showChosenBankToken("Onyx");
    } else if (e.target.classList.contains("sapphire")){
        showChosenBankToken("Sapphire");
    } else if (e.target.classList.contains("diamond")){
        showChosenBankToken("Diamond");
    }
}

function showChosenBankToken(gem){
    if (isLegalToken(gem)){
        updateToken(gem, true);
        const chosenToken = document.createElement("button");
        chosenToken.classList.add(`selected-${gem.toLowerCase()}-token`);
        chosenToken.classList.add("clickable");
        chosenToken.classList.add(gem.toLowerCase());
        chosenToken.addEventListener("click", removeChosenBankToken);
        document.querySelector(".selected-tokens").appendChild(chosenToken);
        chosenBankTokens[gem.toLowerCase()]++;
    }
}

function isLegalToken(gem){
    const maxChosenTokens = 3;
    const maxChosenTokensSameColour = 2;

    const numberOfChosenTokens = document.querySelectorAll(".selected-tokens button").length;

    if (numberOfChosenTokens < maxChosenTokens){
        if (!Object.values(chosenBankTokens).includes(maxChosenTokensSameColour)){
            if (!(numberOfChosenTokens === 2 && chosenBankTokens[gem.toLowerCase()] !== 0)) { //I use a two here to check if there are currently two tokens, doesn't matter what colour they are.
                return true;
            }
        }
    }

    return false;
}

function removeChosenTokens(){
    document.querySelector(".selected-tokens").innerHTML = "";
    for (const [key, value] of Object.entries(chosenBankTokens)) {
        for (let i = 0; i < value; i++) {
            updateToken(key.replace(key[0], key[0].toUpperCase()), false);
        }
    }
    Object.keys(chosenBankTokens).forEach(gem => chosenBankTokens[gem] = 0);
}

function updateToken(gem, remove) {
    if (remove) {
        currentBankTokens[gem]--;
    } else {
        currentBankTokens[gem]++;
    }
    console.log(currentBankTokens);
    document.querySelector(`.token-bank .${gem.toLowerCase()} `).innerHTML = currentBankTokens[gem];
}

export {renderTokenBank, changeButtons, enableTokens, disableTokens, getChosenTokenColour, toggleTokenBorders, removeChosenTokens, setTokenMarketValues, updateToken, chosenBankTokens};