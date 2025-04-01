import { renderDisableCard, renderEnabledCard } from "./market-inactive-renderer.js"

function handleMarket(active){
    const cards = document.querySelectorAll("#market-grid-container article.deck");
    for (const card in cards){
        if (active){
            renderDisableCard(card);
        } else {
            false;
        }
        
    }

}

export { handleMarket}