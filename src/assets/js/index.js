import * as CommunicationAbstractor from "./data-connector/api-communication-abstractor.js";
import * as ErrorHandler from "./data-connector/error-handler.js";
import {changePlayerNameText} from "./components/game-setup/username-selector/renderer.js";
import {renderPopup} from "./components/popup/usernameselector-popup/handeler.js";
import {usernameInit} from "./components/game-setup/username-selector/username-init.js";
import {loadFromStorage} from "./data-connector/local-storage-abstractor.js";

function init() {
    testConnection();
    checkUserName();
    changePlayerNameText();
    eventListenerUsernameSelector();
}

function testConnection() {
    CommunicationAbstractor.fetchFromServer('/gems', 'GET').then(gems => console.log(gems)).catch(ErrorHandler.handleError);
}

function eventListenerUsernameSelector(){
    document.querySelector("#renderButton").addEventListener("click", (e) => {
        e.preventDefault();
        renderPopup();
        usernameInit(e)
    });
}
function checkUserName() {
    if (loadFromStorage("playerName") === null || loadFromStorage("playerName") === undefined || loadFromStorage("username") === null || loadFromStorage("username") === "") {
        renderPopup();
        console.log("opened popup")
    }
    else{
        console.log("you already have a username")
    }

}

init();

export {eventListenerUsernameSelector};
