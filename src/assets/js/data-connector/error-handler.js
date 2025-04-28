import { ERRORHANDLERSELECTOR } from "../config.js";

function generateVisualAPIErrorInConsole(error){
    console.error('%c%s','background-color: red;color: white','! An error occurred while calling the api');
    console.table(error);
}

function handleError(error){
    generateVisualAPIErrorInConsole(error);
    document.querySelector(ERRORHANDLERSELECTOR).innerText = error.cause;
}

export { handleError };
