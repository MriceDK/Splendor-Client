import { loadFromStorage } from "../data-connector/local-storage-abstractor.js";

function getOwnUsername(){
    return loadFromStorage("myUsername")
}