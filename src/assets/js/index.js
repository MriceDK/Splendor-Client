import * as CommunicationAbstractor from "./data-connector/api-communication-abstractor.js";
import * as ErrorHandler from "./data-connector/error-handler.js";
import {changePlayerNameText} from "./components/game-setup/username-selector/renderer.js";
import {renderPopup} from "./components/popup/usernameselector-popup/handeler.js";

function init() {
    testConnection();
    changePlayerNameText();
    eventListenerUsernameSelector()
}

function testConnection() {
    CommunicationAbstractor.fetchFromServer('/gems', 'GET').catch(ErrorHandler.handleError);
}

function eventListenerUsernameSelector(){
    document.getElementById("renderButton").addEventListener("click", (e) => {
        e.preventDefault();
        renderPopup();
    });
}

init();
