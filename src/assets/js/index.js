import * as CommunicationAbstractor from "./data-connector/api-communication-abstractor.js";
import * as ErrorHandler from "./data-connector/error-handler.js";
import {changePlayerNameText} from "./components/game-setup/username-selector/renderer.js";
import {renderPopup} from "./components/popup/usernameselector-popup/handeler.js";
import {usernameInit} from "./components/game-setup/username-selector/username-init.js";


function init() {
    testConnection();
    changePlayerNameText();
    eventListenerUsernameSelector()
}

function testConnection() {
    CommunicationAbstractor.fetchFromServer('/gems', 'GET').catch(ErrorHandler.handleError);
}

function eventListenerUsernameSelector(){
    document.querySelector("#renderButton").addEventListener("click", (e) => {
        console.log("bqllq")
        e.preventDefault();
        renderPopup();
        usernameInit(e)
    });
}


init();
