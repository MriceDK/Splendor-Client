function uppercaseFirstLetterOfWord(word) {
    return word.replace(word[0], word[0].toUpperCase());
}

function showPopupContainer() {
    const $popupContainer = document.querySelector(".popup-container");
    $popupContainer.innerHTML = document.querySelector("#popup-templates").outerHTML;
    $popupContainer.classList.remove("hidden");
}

function convertToKebabCase(string){
    return string.trim().toLowerCase().split(" ").join("-");

}

function getCurrentPlayer(players, currentPlayer){
    for (const player of players) {
        if (player.name === currentPlayer) {
            return player;
        }
    }
    return undefined;
 }

 function elementIsInArray(array, element) {

    for (const item of array) {
        if (item === element) {
            return true;
        }
    }

    return false;

 }

export {uppercaseFirstLetterOfWord, showPopupContainer, convertToKebabCase, getCurrentPlayer, elementIsInArray};