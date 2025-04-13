import * as CommunicationAbstractor from "./data-connector/api-communication-abstractor.js";
import * as ErrorHandler from "./data-connector/error-handler.js";
import {changePlayerNameText} from "./components/game-setup-components/username-selector-component/renderer.js";

function init() {
    testConnection();
    changePlayerNameText();
}

function testConnection() {
    CommunicationAbstractor.fetchFromServer('/gems', 'GET').then(gems => console.log(gems)).catch(ErrorHandler.handleError);
}

init();
