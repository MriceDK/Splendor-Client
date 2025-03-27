import {removeChosenBankToken} from "./handler.js";

const chosenBankTokens = {
    red: 0,
    green: 0,
    black: 0,
    blue: 0,
    white: 0,
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
    document.querySelector(".token-bank .red-token").disabled = false;
    document.querySelector(".token-bank .green-token").disabled = false;
    document.querySelector(".token-bank .black-token").disabled = false;
    document.querySelector(".token-bank .blue-token").disabled = false;
    document.querySelector(".token-bank .white-token").disabled = false;
    toggleTokenBorders();
}

function disableTokens(){
    document.querySelector(".token-bank .red-token").disabled = true;
    document.querySelector(".token-bank .green-token").disabled = true;
    document.querySelector(".token-bank .black-token").disabled = true;
    document.querySelector(".token-bank .blue-token").disabled = true;
    document.querySelector(".token-bank .white-token").disabled = true;
    document.querySelector(".token-bank .joker-token").disabled = true;
    toggleTokenBorders();
}

function toggleTokenBorders(){
    document.querySelector(".token-bank .red-token").classList.toggle("clickable");
    document.querySelector(".token-bank .green-token").classList.toggle("clickable");
    document.querySelector(".token-bank .black-token").classList.toggle("clickable");
    document.querySelector(".token-bank .blue-token").classList.toggle("clickable");
    document.querySelector(".token-bank .white-token").classList.toggle("clickable");
}

function getChosenTokenColour(e){
    if(e.target.classList.contains("red-token")){
        showChosenBankToken("red");
    } else if (e.target.classList.contains("green-token")){
        showChosenBankToken("green");
    } else if (e.target.classList.contains("black-token")){
        showChosenBankToken("black");
    } else if (e.target.classList.contains("blue-token")){
        showChosenBankToken("blue");
    } else if (e.target.classList.contains("white-token")){
        showChosenBankToken("white");
    }
}

function showChosenBankToken(colour){
    if (isLegalToken(colour)){
        const chosenToken = document.createElement("button");
        chosenToken.classList.add(`selected-${colour}-token`);
        chosenToken.classList.add("clickable");
        chosenToken.classList.add(colour);
        chosenToken.addEventListener("click", removeChosenBankToken);
        document.querySelector(".selected-tokens").appendChild(chosenToken);
        chosenBankTokens[colour]++;
        console.log(chosenBankTokens);
    }
}

function isLegalToken(colour){
    const numberOfChosenTokens = document.querySelectorAll(".selected-tokens button").length;

    if (numberOfChosenTokens < 3){
        if (chosenBankTokens[colour] < 2 && !Object.values(chosenBankTokens).includes(2)){
            if (!(numberOfChosenTokens === 2 && chosenBankTokens[colour] >= 1)) {
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

export {changeButtons, enableTokens, disableTokens, getChosenTokenColour, toggleTokenBorders, removeChosenTokens, chosenBankTokens};