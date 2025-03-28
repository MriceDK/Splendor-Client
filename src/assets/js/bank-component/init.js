import * as handler from "./handler.js";
import * as renderer from "./renderer.js";

init();

function init(){
    renderer.disableTokens();
    renderer.toggleTokenBorders();
    handler.getBankInfo(27);

    document.querySelector(".bank-buttons .take-gems-button").addEventListener("click", handler.openBank);
    document.querySelector(".bank-buttons .cancel-button").addEventListener("click", handler.closeBank);
    document.querySelectorAll(".token-bank button").forEach(button => button.addEventListener("click", handler.chooseBankToken));
}

