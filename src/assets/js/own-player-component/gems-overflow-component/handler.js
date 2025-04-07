import { renderTooManyGemsPopUp } from "../renderer.js";
import * as APIAbstractor from "../../data-connector/api-communication-abstractor.js"
function checkTooMuchGems(playersInfos, currentPlayer){
    playersInfos.forEach(player => {
        if (player.name === currentPlayer){
            checkTooMuchGemsHelp(player);

        }
        
    });
    
}

function checkTooMuchGemsHelp(player){
    let tokensOfPlayer = 0;
    players.tokens.forEach(token => {
        tokensOfPlayer += player.tokens[token];

    });
    if (tokensOfPlayer > 10){
        renderTooManyGemsPopUp();
        formGemChecker();
    }
}

function formGemChecker(){
    const gemsCount = countGems();
    if (gemsCount > 10){
        document.querySelector("#gem-remover-button").disabled = true;
        setTimeout(formGemChecker, 500);
    } else {
        document.querySelector("#gem-remover-button").disabled = false;
    }
    
}

function countGems(){
    const allGems = document.querySelectorAll(".gem-remover-input");
    let count = 0;
    allGems.forEach(gem => {
        count += gem.getAttribute("value");
    });
    return count;
}


function updateGemsAfterTooMuch(gameId, playerName, players){
    let currentPlayerObject = null;
    players.forEach(player => {
        if (player.name === playerName){
            currentPlayerObject = player;
            
        }
    });  
   
    const tokensToReturn = getDiffTokensObject(player.tokens);
    const body = returnTokensBody(tokensToReturn);

    APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/tokens`, "PATCH", body);


}

function getDiffTokensObject(tokens){
    const returnObject = {};
    const $tokensForm = document.querySelectorAll(".gem-remover-input");
    $tokensForm.forEach(token => { 
        returnObject[token.getAttribute("name")] = purse[token.getAttribute("name")] - token.getAttribute("value");
        
    });

    return returnObject;
}

function returnTokensBody(tokens){
    returnObj = {};
    tokens.forEach(token => {
        if (valueToReturn > 0){
            returnObj[token] = valueToReturn;
        }

    });
    return {
        "return": returnObj
        
    };
}
export { checkTooMuchGems, updateGemsAfterTooMuch }