import { renderDisableCard, renderEnabledCard } from "./market-inactive-renderer.js"

function handleInactiveMarket(){
    const cards = document.querySelectorAll("#market-grid-container article.deck");
    for (const card in cards){
        renderDisableCard(card);
    }

}

function handleActiveMarket(){
    const cards = document.querySelectorAll("#market-grid-container article.deck");
    for (const card in cards){
        renderEnabledCard(card);
    }
}
export { handleInactiveMarket, handleActiveMarket }