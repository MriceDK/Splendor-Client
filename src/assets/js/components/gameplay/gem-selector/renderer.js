import * as Utils from "../../../helper/utils.js";
import {hookupEventListeners} from "./handler.js";


const $tokenSelector = document.querySelector("#token-selector").content.firstElementChild.cloneNode(true);

function renderTokenSelectorForm(devCardName, reservedCard) {
    Utils.showPopupContainer();

    const $target = document.querySelector(".popup-container");

    $tokenSelector.querySelector("#token-selector-dev-card").value = devCardName;
    $target.insertAdjacentHTML("beforeend", $tokenSelector.outerHTML);

    hookupEventListeners(reservedCard);
}



export {renderTokenSelectorForm};