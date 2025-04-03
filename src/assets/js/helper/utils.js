
function UppercaseFirstLetterOfWord(word) {
    return word.replace(word[0], word[0].toUpperCase());
}

function showPopupContainer() {
    const popupContainer = document.querySelector(".popup-container");
    document.querySelector("#confirmation-pop-up-result").innerHTML = "";
    popupContainer.classList.remove("hidden");
}

export { UppercaseFirstLetterOfWord, showPopupContainer };