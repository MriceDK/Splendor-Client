import * as handler from "./handler.js";
import {loadFromStorage} from "../data-connector/local-storage-abstractor.js";
import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import { UppercaseFirstLetterOfWord } from "../helper/utils.js";

const chosenBankTokens = {
    Ruby: 0,
    Emerald: 0,
    Onyx: 0,
    Sapphire: 0,
    Diamond: 0,
};
const currentBankTokens = {
    Ruby: 0,
    Emerald: 0,
    Onyx: 0,
    Sapphire: 0,
    Diamond: 0,
};

function renderTokenBank(gameInfo) {
    enableOrDisableBank(gameInfo.currentPlayer);
    disableTokens();
    toggleTokenBorders();
    setTokenMarketValues(gameInfo);

    hoopUpEvents();
}

function hoopUpEvents() {
    document.querySelector(".bank-buttons .take-gems-button").addEventListener("click", handler.openBank);
    document.querySelector(".bank-buttons .cancel-button").addEventListener("click", handler.closeBank);
    document.querySelector(".bank-buttons .collect-gems-button").addEventListener("click", collectTokens);
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

function enableOrDisableBank(playerName) {
    if (playerName === loadFromStorage("myUsername")){
        document.querySelector(".bank-buttons .take-gems-button").classList.remove("hidden");
    } else {
        document.querySelector(".bank-buttons .take-gems-button").classList.add("hidden");
    }
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

function collectTokens(){
    const gameId = loadFromStorage("gameId");
    const playerName = loadFromStorage("myUsername");
    const tokenData = {
        "take": chosenBankTokens
    }

    APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/tokens`, "PATCH", tokenData).then(r => r);

    enableOrDisableBank(playerName);
    handler.closeBank();
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
        chosenToken.addEventListener("click", handler.removeChosenBankToken);
        document.querySelector(".selected-tokens").appendChild(chosenToken);
        chosenBankTokens[gem]++;
    }
}

function isLegalToken(gem){

    const numberOfChosenTokens = document.querySelectorAll(".selected-tokens button").length;

    if (checkMaxThreeTokens(numberOfChosenTokens)){
        if (checkMaxTwoOfSameColour()){
            if (checkMaxTwoOfSameColourWhenTwoSelected(numberOfChosenTokens, gem)) {
                return checkOnlyTwoOfSameColourWhenValueOfMinFour(gem);
            }
        }
    }

    return false;
}

function checkMaxThreeTokens(numberOfChosenTokens) {
    const maxChosenTokens = 3;

    return numberOfChosenTokens < maxChosenTokens
}

function checkMaxTwoOfSameColour(){
    const maxChosenTokensSameColour = 2;

    return !Object.values(chosenBankTokens).includes(maxChosenTokensSameColour)
}

function checkMaxTwoOfSameColourWhenTwoSelected(numberOfChosenTokens, gem){
    return !(numberOfChosenTokens === 2 && chosenBankTokens[gem] !== 0);
}

function checkOnlyTwoOfSameColourWhenValueOfMinFour(gem){
    const minValueTwoOfSameColourAllowed = 4;
    const maxTokensOfAColourWhenColourValuesLessThanFour = 1;

    return !(chosenBankTokens[gem] + currentBankTokens[gem] < minValueTwoOfSameColourAllowed && chosenBankTokens[gem] === maxTokensOfAColourWhenColourValuesLessThanFour);
}

function removeChosenTokens(){
    document.querySelector(".selected-tokens").innerHTML = "";
    for (const [key, value] of Object.entries(chosenBankTokens)) {
        for (let i = 0; i < value; i++) {
            const uppercasedKey = UppercaseFirstLetterOfWord(key);
            updateToken(uppercasedKey, false);
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
    document.querySelector(`.token-bank .${gem.toLowerCase()} `).innerHTML = currentBankTokens[gem];
}

export {renderTokenBank, changeButtons, enableTokens, disableTokens, getChosenTokenColour, toggleTokenBorders, removeChosenTokens, setTokenMarketValues, updateToken, chosenBankTokens};