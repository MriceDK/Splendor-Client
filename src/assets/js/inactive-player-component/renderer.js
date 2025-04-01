import { renderDevelopmentCards } from "../development-card-component/renderer";
import 

function renderDisabledPlayerFunctionalities(){
    const $currentActive = document.querySelector(".active-player");
    $currentActive.classList.remove("active-player");
    $currentActive.classList.add("active-player");
    renderDevelopmentCards("", "", false);

    
}

function renderRemoveDisabledClass(){
    const $currentDisabled = document.querySelector(".disabled-player");
    $currentDisabled.classList.add("active-player");
    $currentDisabled.classList.remove("disabled-player");
    renderDevelopmentCards("", "", true);

    
}

export { renderDisabledPlayerFunctionalities, renderRemoveDisabledClass }