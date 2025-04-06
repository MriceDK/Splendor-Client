import { renderTooManyGemsPopUp } from "../renderer.js";

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
        document.querySelector("#gem-remover-button").classList.add("disabled")
        setTimeout(formGemChecker, 500);
    } else {
        document.querySelector("#gem-remover-button").classList.remove("disabled")
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
export { checkTooMuchGems }