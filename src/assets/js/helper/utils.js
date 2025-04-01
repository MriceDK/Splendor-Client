
function UppercaseFirstLetterOfWord(word) { // TODO in een aparte utils module stoppen
    return word.replace(word[0], word[0].toUpperCase());
}

function hidePopupContainer() {
    const popupContainer = document.querySelector(".popup-container");
    popupContainer.innerHTML = "";
    popupContainer.classList.add("hidden");
}

function showPopupContainer() {
    const popupContainer = document.querySelector(".popup-container");
    popupContainer.innerHTML = "";
    popupContainer.classList.remove("hidden");
}

export { UppercaseFirstLetterOfWord, showPopupContainer, hidePopupContainer };