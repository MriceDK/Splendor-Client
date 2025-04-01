import { renderDevelopmentCards } from "../development-card-component/renderer";
import 

function renderDisabledPlayerFunctionalities(){
    renderDevelopmentCards("", "", false);
    
}

function renderRemoveDisabledClass(){
    const $currentDisabled = document.querySelector(".disabled-player");
    $currentDisabled.classList.add("active-player");
    $currentDisabled.classList.remove(".disabled-player");
    renderDevelopmentCards("", "", true);

    
}

export { renderDisabledPlayerFunctionalities, renderRemoveDisabledClass }