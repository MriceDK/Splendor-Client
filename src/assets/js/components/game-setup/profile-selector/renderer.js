import {hideUserNamePopup} from "../../popup/usernameselector-popup/renderer.js";
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

let currentIndex = 0;

function setupAvatarSlider() {
    updateAvatarDisplay();
    hookUpAvatarSliderEvents();
}

function hookUpAvatarSliderEvents() {
    const leftBtn = document.querySelector("#left-btn");
    const rightBtn = document.querySelector("#right-btn");

    leftBtn.addEventListener("click", e => buttonHandler(e, "left"));

    rightBtn.addEventListener("click", e => buttonHandler(e, "right"));
}

function buttonHandler(e, direction){
    e.preventDefault();
    if (direction === "right"){
        currentIndex = (currentIndex + 1) % avatars.length;
        updateAvatarDisplay();

    } else {
        currentIndex = (currentIndex - 1 + avatars.length) % avatars.length;
        updateAvatarDisplay();

    }

}

function updateAvatarDisplay() {
    const avatarDisplay= document.querySelector("#avatar-display");
    const avatarFile = avatars[currentIndex];
    const countryCode = avatarFile.substring(0, 2);

    avatarDisplay.src = `assets/images/avatars/${avatarFile}`;
    avatarDisplay.alt = `Avatar for ${countryCode}`;
    avatarDisplay.title = countryCode;
}

function changeProfileSection(countryCode) {
    setProfilePicture(countryCode);
    document.querySelector("#playername").innerText = loadFromStorage("playerName");
    closePlayerNamePopup()
}

function setProfilePicture(countryCode){
    const image = `assets/images/avatars/${countryCode}.jpg`;
    const $img = document.querySelector("header img");
    $img.src = image;
    $img.alt = `Avatar for ${countryCode}`;
    $img.title = countryCode;
}

function closePlayerNamePopup(){
    hideUserNamePopup();
}

function renderAvatar() {
    const countryCode = loadFromStorage("avatar");
    if (!countryCode) return;
    setProfilePicture(countryCode);
}

export {changeProfileSection, setupAvatarSlider, renderAvatar };