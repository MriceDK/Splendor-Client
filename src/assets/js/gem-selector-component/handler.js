import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as LocalStorageAbstractor from "../data-connector/local-storage-abstractor.js";
import * as Utils from "../helper/utils.js";

function buyDevelopmentCard(e) {
    e.preventDefault();

    const $form = document.querySelector("#token-selector-form");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const gemCost = getGemCostObject($form);

    const body = createBody(devCardName, gemCost);
    buyDevelopmentCardRequest(body);
}

function buyDevelopmentCardRequest(body) {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    const playerName = LocalStorageAbstractor.loadFromStorage("myUsername");

    APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/developments`, "POST", body)
        .then(res => {
            Utils.hidePopupContainer();

        })
        .catch(err => {
            Utils.hidePopupContainer();
        });
}

function createBody(devCardName, gemCost) {
    return {
        development: {
            name: devCardName
        },
        payment: gemCost
    };
}

function getGemCostObject($form) {
    const $inputs = $form.querySelectorAll(".gem-selector-input");
    const obj = {};

    $inputs.forEach($input => {
        const gemName = Utils.UppercaseFirstLetterOfWord($input.name);

        obj[gemName] = parseInt($input.value);
    })

    return obj;
}

export { buyDevelopmentCard };