import {removeChosenBankToken} from "./handler.js";

const chosenBankTokens = {
    ruby: 0,
    emerald: 0,
    onyx: 0,
    sapphire: 0,
    diamond: 0,
};

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

function getChosenTokenColour(e){
    if(e.target.classList.contains("ruby")){
        showChosenBankToken("ruby");
    } else if (e.target.classList.contains("emerald")){
        showChosenBankToken("emerald");
    } else if (e.target.classList.contains("onyx")){
        showChosenBankToken("onyx");
    } else if (e.target.classList.contains("sapphire")){
        showChosenBankToken("sapphire");
    } else if (e.target.classList.contains("diamond")){
        showChosenBankToken("diamond");
    }
}

function showChosenBankToken(gem){
    if (isLegalToken(gem)){
        const chosenToken = document.createElement("button");
        chosenToken.classList.add(`selected-${gem}-token`);
        chosenToken.classList.add("clickable");
        chosenToken.classList.add(gem);
        chosenToken.addEventListener("click", removeChosenBankToken);
        document.querySelector(".selected-tokens").appendChild(chosenToken);
        chosenBankTokens[gem]++;
    }
}

function isLegalToken(gem){
    const maxChosenTokens = 3;
    const maxChosenTokensSameColour = 2;

    const numberOfChosenTokens = document.querySelectorAll(".selected-tokens button").length;

    if (numberOfChosenTokens < maxChosenTokens){
        if (!Object.values(chosenBankTokens).includes(maxChosenTokensSameColour)){
            if (!(numberOfChosenTokens === 2 && chosenBankTokens[gem] !== 0)) { //I use a two here to check if there are currently two tokens, doesn't matter what colour they are.
                return true;
            }
        }
    }

    return false;
}

function removeChosenTokens(){
    document.querySelector(".selected-tokens").innerHTML = "";
    Object.keys(chosenBankTokens).forEach(colour => chosenBankTokens[colour] = 0);
}


function setTokenMarketValues(gameInfo){
    document.querySelector(".token-bank .ruby").innerHTML = gameInfo.unclaimedTokens.Ruby;
    document.querySelector(".token-bank .emerald").innerHTML = gameInfo.unclaimedTokens.Emerald;
    document.querySelector(".token-bank .onyx").innerHTML = gameInfo.unclaimedTokens.Onyx;
    document.querySelector(".token-bank .sapphire").innerHTML = gameInfo.unclaimedTokens.Sapphire;
    document.querySelector(".token-bank .diamond").innerHTML = gameInfo.unclaimedTokens.Diamond;
    document.querySelector(".token-bank .gold").innerHTML = gameInfo.unclaimedTokens.Gold;
}

export {changeButtons, enableTokens, disableTokens, getChosenTokenColour, toggleTokenBorders, removeChosenTokens, setTokenMarketValues, chosenBankTokens};