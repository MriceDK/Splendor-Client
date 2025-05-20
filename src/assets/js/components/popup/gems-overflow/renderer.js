import {displayGame} from "../../../game";
import * as api from "../../../api/gameplay-api";

function showReturnTokensPopup(playerTokens) {
    const $popup = document.querySelector("#too-many-gems-pop-up-template").content.firstElementChild.cloneNode(true);
    const $container = document.querySelector(".popup-container");

    $container.innerHTML = ""; // Clear previous content
    $container.classList.remove("hidden"); // Show popup

    // Populate max values and create inputs
    Object.entries(playerTokens).forEach(([tokenName, count]) => {
        const input = $popup.querySelector(`input[name="${tokenName.toLowerCase()}"]`);
        if (input) {
            input.max = count;
            input.value = 0;
        }
    });

    // Submit handler
    $popup.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const tokensToReturn = {};
        for (const [key, value] of formData.entries()) {
            tokensToReturn[key] = Number(value);
        }

        const totalReturned = Object.values(tokensToReturn).reduce((a, b) => a + b, 0);
        const currentTotal = countTotalTokens(playerTokens);

        if (currentTotal - totalReturned > 10) {
            alert("You must return enough tokens to have 10 or fewer.");
            return;
        }

        api.updateTokens(gameId, playername, tokensToReturn);
        $container.classList.add("hidden");
        $container.innerHTML = "";

        // Resume game
        displayGame();
    });

    $container.insertAdjacentHTML("beforeend",$popup);
}


export {showReturnTokensPopup};