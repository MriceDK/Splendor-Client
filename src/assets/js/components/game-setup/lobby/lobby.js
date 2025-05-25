import * as handler from "./handler.js";
import {renderAvatar} from "../profile-selector/renderer.js";

function init() {

    handler.loadJoinedGame();
    renderAvatar();
}

init();