import { renderDisableCard } from "./market-inactive-renderer.js"

function handleInactiveMarket(){
    const cards = document.querySelectorAll("#market-grid-container article.deck");
    for (const card in cards){
        renderDisableCard(card);
    }

}