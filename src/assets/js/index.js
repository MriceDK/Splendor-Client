import * as CommunicationAbstractor from "./data-connector/api-communication-abstractor.js";
import * as ErrorHandler from "./data-connector/error-handler.js";
import {changeProfileSection, renderAvatar} from "./components/game-setup/profile-selector/renderer.js";
import {renderPopup} from "./components/popup/profile-selector-popup/handler.js";
import {profileInit} from "./components/game-setup/profile-selector/profile-init.js";
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
        profileInit();
    });
}
function checkUserName() {
    if (loadFromStorage("playerName") === null || loadFromStorage("playerName") === undefined || loadFromStorage("playerName") === "") {
        renderPopup();
        profileInit();
    }
}

init();

export {eventListenerUsernameSelector, checkUserName};
