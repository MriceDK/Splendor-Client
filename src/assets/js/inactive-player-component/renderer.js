import { renderDisabledCard, renderEnabledCard } from "./market-util-inactive-component/market-inactive-renderer.js"
import { handleInactiveMarket } from "./market-util-inactive-component/market-inactive-handler.js"
function renderDisabledPlayerFunctionalities(){
    const $currentActive = document.querySelector(".active-player");
    $currentActive.classList.remove("active-player");
    $currentActive.classList.add("disabled-player");
    handleInactiveMarket();



    
}

function renderRemoveDisabledClass(){
    const $currentDisabled = document.querySelector(".disabled-player");
    $currentDisabled.classList.add("active-player");
    $currentDisabled.classList.remove("disabled-player");
    renderEnabledCard();

    
}

export { renderDisabledPlayerFunctionalities, renderRemoveDisabledClass }