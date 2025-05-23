import { ERRORHANDLERSELECTOR } from "../config.js";

function generateVisualAPIErrorInConsole(error){
    console.error('%c%s','background-color: red;color: white','! An error occurred while calling the api');
    console.table(error);
}

function handleError(error){
    generateVisualAPIErrorInConsole(error);
    document.querySelector(ERRORHANDLERSELECTOR).innerText = getCorrectMessageFromError(error);
}

function getCorrectMessageFromError(error) {
    if (error.cause !== undefined && error.cause !== null) {
        return error.cause;
    } else if (error.message !== undefined && error.message !== null) {
        return error.message;
    } else {
        return "Something went wrong";
    }
}

export { handleError, getCorrectMessageFromError };
