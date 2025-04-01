
function renderDisabledPlayerFunctionalities(){
    const $currentActive = document.querySelector(".active-player");
    $currentActive.classList.remove("active-player");
    $currentActive.classList.add("active-player");

    
}

function renderRemoveDisabledClass(){
    const $currentDisabled = document.querySelector(".disabled-player");
    $currentDisabled.classList.add("active-player");
    $currentDisabled.classList.remove("disabled-player");

    
}

export { renderDisabledPlayerFunctionalities, renderRemoveDisabledClass }