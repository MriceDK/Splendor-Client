function getAllDevCardsFromMarket(market) {
    const cards = [];

    market.forEach(level => {

        level.visibleCards.forEach(card => {
            cards.push(card);
        })

    })

    return cards;
}

function getListOfBuyableCards(market, ownTokens) {
    const list = [];

    const cards = getAllDevCardsFromMarket(market);

    cards.forEach(card => {
        if (isBuyable(card.cost, ownTokens)) {

            list.push(card.name);
        }

    })

    return list;

}

function isBuyable(priceDevCard, ownTokens) {
    let counter = 0;

    Object.entries(priceDevCard).forEach((obj) => {
        if (ownTokens[obj[0]] >= obj[1] ) {
            counter++;
        }
    })

    return counter === Object.entries(priceDevCard).length;
}

export { getListOfBuyableCards };