    import {putInitalValue} from "../../gameplay/own-player/helper.js";
    import {countTotalTokens} from "./handler.js"

    function renderTooManyGemsPopUp(playerTokens) {
        const $tooMuchGemsTemplate = document.querySelector("#too-many-gems-pop-up-template").content.firstElementChild.cloneNode(true);
        const $target = document.querySelector(".popup-container");
        if (!$tooMuchGemsTemplate){
            return;
        }
        $target.innerHTML = "";
        $target.classList.remove("hidden");
        if (playerTokens > countTotalTokens(playerTokens)) {

            Object.entries(playerTokens).forEach(token => putInitalValue($tooMuchGemsTemplate, token));

        }

        $target.insertAdjacentHTML("beforeend", $tooMuchGemsTemplate.outerHTML);


    }

    export {renderTooManyGemsPopUp};