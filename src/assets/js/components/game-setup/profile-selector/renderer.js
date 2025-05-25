import {hideUserNamePopup} from "../../popup/usernameselector-popup/renderer.js";
import {hookUpEventListenerToImages} from "./handler.js";
import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";

const avatars = [
    "ar.jpg",
    "au.jpg",
    "be.jpg",
    "br.jpg",
    "cd.jpg",
    "ch.jpg",
    "cn.jpg",
    "de.jpg",
    "eg.jpg",
    "fr.jpg",
    "gl.jpg",
    "hk.jpg",
    "il.jpg",
    "jp.jpg",
    "mm.jpg",
    "ps.jpg",
    "ru.jpg",
    "sa.jpg",
    "tw.jpg",
    "ua.jpg",
    "un.jpg",
    "us.jpg",
    "za.jpg"
]

function changePlayerNameText() {

    document.querySelector("#playername").innerText = loadFromStorage("playerName");
    closePlayerNamePopup()
}

function closePlayerNamePopup(){
    hideUserNamePopup();
}

function renderAvatars(){
    const $container = document.querySelector(".popup-container #avatar-selector-container");
    const $template = document.querySelector("#avatar-template").content.firstElementChild.cloneNode(true);
    avatars.forEach(avatar => {
        const countryCode = avatar.substring(0, 2);
        $template.querySelector("img").src = `assets/images/avatars/${avatar}`;
        $template.querySelector("img").title = `${countryCode}`;
        $template.querySelector("img").alt = `Avatar for ${countryCode}`;
        $container.insertAdjacentHTML("beforeend", $template.outerHTML);
    });

    hookUpEventListenerToImages()


}

function renderAvatar(){
    const countryCode = loadFromStorage("avatar");
    const image = `assets/images/avatars/${countryCode}.jpg`;
    const $img = document.querySelector("header img");
    $img.src = image;
    $img.alt = `Avatar for ${countryCode}`;
    $img.title = `${countryCode}`;
}

export {changePlayerNameText, renderAvatars, renderAvatar };