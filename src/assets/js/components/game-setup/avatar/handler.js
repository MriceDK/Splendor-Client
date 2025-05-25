import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";

function changeAvatar(e, countryCode){
    e.preventDefault();
    LocalStorageAbstractor.saveToStorage("avatar", countryCode);
}

function hookUpEventListenerToImages(){
    const $container = document.querySelector("#avatar-selector-container");
    $container.addEventListener("click", e => {
        const img = e.target.closest("img");
        if (img && $container.contains(img)) {
            const countryCode = img.title;
            changeAvatar(e, countryCode);
        }
    });
}

export { hookUpEventListenerToImages }