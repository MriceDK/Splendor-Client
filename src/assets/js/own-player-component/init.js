import { fetchOwnPlayerInfo } from "./handler.js"
import { ownPlayerCardRenderer } from "./renderer.js"
import { saveToStorage } from "../data-connector/local-storage-abstractor.js";

function init(){

    saveToStorage("playerToken", "1_Bisson");
    ownPlayerCardRenderer();
    
}

init()