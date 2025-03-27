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

function showChosenBankToken(e){
    if(e.target.classList.contains("red-token")){
        console.log("Red");
    } else if (e.target.classList.contains("green-token")){
        console.log("Green");
    } else if (e.target.classList.contains("black-token")){
        console.log("Black");
    } else if (e.target.classList.contains("blue-token")){
        console.log("Blue");
    } else if (e.target.classList.contains("white-token")){
        console.log("White");
    }
}

export {changeButtons, enableTokens, disableTokens, showChosenBankToken, toggleTokenBorders};