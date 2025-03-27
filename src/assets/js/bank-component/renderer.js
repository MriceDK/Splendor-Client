let chosenBankTokens = [];

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
        console.log("Red");
        showChosenBankToken("red");
    } else if (e.target.classList.contains("green-token")){
        console.log("Green");
        showChosenBankToken("green");
    } else if (e.target.classList.contains("black-token")){
        console.log("Black");
        showChosenBankToken("black");
    } else if (e.target.classList.contains("blue-token")){
        console.log("Blue");
        showChosenBankToken("blue");
    } else if (e.target.classList.contains("white-token")){
        console.log("White");
        showChosenBankToken("white");
    }
}

function showChosenBankToken(colour){
    if (isLegalToken(colour)){
        const chosenToken = document.createElement("button");
        chosenToken.classList.add(`selected-${colour}-token`);
        chosenToken.classList.add("clickable");
        document.querySelector(".selected-tokens").appendChild(chosenToken);
        chosenBankTokens.push(colour);
    }
}

function isLegalToken(colour){
    const numberOfChosenTokens = document.querySelectorAll(".selected-tokens button").length;
    const TokensWithColour = countNumberOfColourInChosenTokens(colour);

    if (numberOfChosenTokens < 3){
        if (countNumberOfColourInChosenTokens(colour) < 2 && countNumberOfColourInChosenTokens(chosenBankTokens[0]) < 2){
            if (!(numberOfChosenTokens === 2 && countNumberOfColourInChosenTokens(chosenBankTokens[0]) === TokensWithColour && countNumberOfColourInChosenTokens(chosenBankTokens[1]) === TokensWithColour)) {
                return true;
            }
        }
    }

    return false;
}

function countNumberOfColourInChosenTokens(colour){
    let count = 0;
    for (let i = 0; i < chosenBankTokens.length; i++) {
        if (chosenBankTokens[i] === colour){
            count++;
        }
    }
    return count;
}

function removeChosenTokens(){
    document.querySelector(".selected-tokens").innerHTML = "";
    chosenBankTokens = [];
}

export {changeButtons, enableTokens, disableTokens, getChosenTokenColour, toggleTokenBorders, removeChosenTokens};