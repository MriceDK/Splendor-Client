

function renderDisabledPlayerFunctionalities(){
    return null;
}

function renderRemoveDisabledClass(){
    const $currentDisabled = document.querySelector(".disabled-player");
    $currentDisabled.classList.add("active-player");
    $currentDisabled.classList.remove(".disabled-player");
    
}

export { renderDisabledPlayerFunctionalities, renderRemoveDisabledClass }