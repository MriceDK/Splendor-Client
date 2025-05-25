import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";

function changeAvatar(e, avatar){
    e.preventDefault();
    LocalStorageAbstractor.saveToStorage("avatar", avatar);
}

export { changeAvatar }