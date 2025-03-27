import * as storageAbstractor from "../data-connector/local-storage-abstractor.js";

function lobbyName(lobbyName, username) {

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
function userCount(amount){

    console.log(amount);
}
function started(bool){

    console.log(bool);
}
function userName(name){
    document.querySelector("#username").textContent = name;
}

export { lobbyName, maxUserCount, userCount, started, userName };

