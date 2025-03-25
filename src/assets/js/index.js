import * as CommunicationAbstractor from "./data-connector/api-communication-abstractor.js";
import * as ErrorHandler from "./data-connector/error-handler.js";
import { changeUsernameText } from "./username-selector-component/renderer.js";

function init() {
  testConnection();
  document.querySelector("#username").addEventListener("load", changeUsernameText);
}

function testConnection(){
  CommunicationAbstractor.fetchFromServer('/gems', 'GET').then(gems => console.log(gems)).catch(ErrorHandler.handleError);
}


init();
