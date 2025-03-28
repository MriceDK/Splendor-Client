import {closeBank, openBank, chooseBankToken} from "./handler.js";
import {disableTokens, toggleTokenBorders} from "./renderer.js";

init();

function init(){
    disableTokens();
    toggleTokenBorders();
    document.querySelector(".bank-buttons .take-gems-button").addEventListener("click", openBank);
    document.querySelector(".bank-buttons .cancel-button").addEventListener("click", closeBank);
    document.querySelectorAll(".token-bank button").forEach(button => button.addEventListener("click", chooseBankToken));
}

