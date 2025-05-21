import { updateTokensAfterTooMany} from "./handler.js";

function init(){
    hookUpEventListenerOnTooMuchGemsForm();
}

function hookUpEventListenerOnTooMuchGemsForm() {
    const $form = document.querySelector("#too-many-gems-pop-up-form");
    $form.addEventListener("submit", updateTokensAfterTooMany);

}

//init();