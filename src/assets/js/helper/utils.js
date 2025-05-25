function uppercaseFirstLetterOfWord(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

function makeNameValid(name){
    const output = name.split(" ").join("");
    return output;
}

function toTwoDigit(str) {
    str = str + "";
    if (str.length < 2) {
        str = `0${str}`;
        str = toTwoDigit(str);
    }

    return str;
}

function calculateTotalTokens(tokens) {
    let res = 0;

    Object.entries(tokens).forEach(([name, value]) => {
        res += value;
    })

    return res;
}

export {uppercaseFirstLetterOfWord, showPopupContainer, convertToKebabCase, getCurrentPlayer, elementIsInArray, makeNameValid, toTwoDigit, calculateTotalTokens};