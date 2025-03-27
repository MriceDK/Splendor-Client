import * as storageAbstractor from "../data-connector/local-storage-abstractor.js";

function lobbyName(lobbyName) {

    if (lobbyName === null || lobbyName === ""){
        let titleElement = document.querySelector("#title");
        titleElement.textContent = storageAbstractor.loadFromStorage("myUsername") + titleElement.textContent;
    }
    else{
        document.querySelector("#title").textContent = lobbyName;
    }
}
function maxUserCount(amount){

}
function renderUsers(userArray){
    const $template = document.querySelector("#player");
    const $target = document.querySelector(".users");

    userArray.forEach(user => {
        const $copy = $template.content.firstElementChild.cloneNode(true);

        $copy.textContent = user;

        $target.insertAdjacentHTML("beforeend", $copy.outerHTML);
    })

    console.log(userArray,amount);
}
function started(bool){

    console.log(bool);
}
function renderOwnUserName(playerCount){
    storageAbstractor.loadFromStorage()
    document.querySelector("#username").textContent;
}

export { lobbyName, maxUserCount, renderOwnUserName, started, renderUsers };

