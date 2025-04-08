
function UppercaseFirstLetterOfWord(word) {
    return word.replace(word[0], word[0].toUpperCase());
}

function showPopupContainer() {
    const $popupContainer = document.querySelector(".popup-container");
    $popupContainer.innerHTML = "";
    $popupContainer.classList.remove("hidden");
}

export { UppercaseFirstLetterOfWord, showPopupContainer };