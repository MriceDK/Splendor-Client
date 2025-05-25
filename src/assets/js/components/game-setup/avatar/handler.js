import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";

function changeAvatar(e, countryCode){
    e.preventDefault();
    LocalStorageAbstractor.saveToStorage("avatar", countryCode);
}

function handleClickOnFlag(e) {
    e.preventDefault();
    const img = e.target.closest("img");
    if (img) {
        const countryCode = img.title;
        changeAvatar(e, countryCode);
    }
}

function hookUpEventListenerToImages(){
    const $container = document.querySelector("#avatar-selector-container");
    $container.addEventListener("click", handleClickOnFlag);
}

export { hookUpEventListenerToImages }