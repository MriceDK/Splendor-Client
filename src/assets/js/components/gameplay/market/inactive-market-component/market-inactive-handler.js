import {renderDisableCard, renderEnabledCard} from "../../development-card/renderer.js";

function handleMarketClickability(clickable) {
    const cards = document.querySelectorAll(".market-grid-container article");
    cards.forEach(card => {
        if (clickable) {
            renderEnabledCard(card);
        } else {
            renderDisableCard(card);
        }
    });
}

export {handleMarketClickability};