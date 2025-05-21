import {putInitalValue} from "../../gameplay/own-player/helper.js";

function renderTooManyGemsPopUp(playerTokens) {
    const $tooMuchGemsTemplate = document.querySelector("#too-many-gems-pop-up-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");
    $target.innerHTML = document.querySelector("#popup-templates").outerHTML;
    $target.classList.remove("hidden");
    Object.entries(playerTokens).forEach(token => putInitalValue($tooMuchGemsTemplate, token));

    $target.insertAdjacentHTML("beforeend", $tooMuchGemsTemplate.outerHTML);

    return $tooMuchGemsTemplate;


}

export {renderTooManyGemsPopUp};