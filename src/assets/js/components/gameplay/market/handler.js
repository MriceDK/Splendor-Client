import {renderDisableCard, renderEnabledCard} from "../development-card/renderer.js";

function handleClickability(clickable, targetContainerClass) {
    const cards = document.querySelectorAll(`.${targetContainerClass} article`);
    cards.forEach(card => {
        if (clickable) {
            renderEnabledCard(card);
        } else {
            renderDisableCard(card);
        }
    });
}

export {handleClickability};