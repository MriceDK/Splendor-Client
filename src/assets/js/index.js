import * as CommunicationAbstractor from "./data-connector/api-communication-abstractor.js";
import * as ErrorHandler from "./data-connector/error-handler.js";
import {changeProfileSection, renderAvatar} from "./components/game-setup/profile-selector/renderer.js";
import {renderPopup} from "./components/popup/usernameselector-popup/handler.js";
import {usernameInit} from "./components/game-setup/profile-selector/username-init.js";
import {loadFromStorage} from "./data-connector/local-storage-abstractor.js";

function init() {
    testConnection();
    changeProfileSection();
    checkUserName();
    eventListenerUsernameSelector();
    renderAvatar();
}

function testConnection() {
    CommunicationAbstractor.fetchFromServer('/gems', 'GET').then(gems => console.log(gems)).catch(ErrorHandler.handleError);
}

function eventListenerUsernameSelector(){
    document.querySelector("#renderButton").addEventListener("click", (e) => {
        e.preventDefault();
        renderPopup();
        usernameInit();
    });
}
function checkUserName() {
    if (loadFromStorage("playerName") === null || loadFromStorage("playerName") === undefined || loadFromStorage("playerName") === "") {
        renderPopup();
        usernameInit();
    }
}

init();

export {eventListenerUsernameSelector, checkUserName};
