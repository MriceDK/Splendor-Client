function getAllDevCardsFromMarket(market) {
    const cards = [];

    market.forEach(level => {

        level.visibleCards.forEach(card => {
            cards.push(card);
        })

    })

    return cards;
}

function getListOfBuyableCards(market, ownTokens, bonuses) {
    const list = [];

    const cards = getAllDevCardsFromMarket(market);
    const bonusAndOwnTokens = calculateFullTokenAmount(ownTokens, bonuses);

    cards.forEach(card => {
        if (isBuyable(card.cost, bonusAndOwnTokens)) {

            list.push(card.name);
        }

    })

    return list;

}

// TODO schrijf een functie die uitrekent hoeveel tokens er nog nodig zijn zodat er kan berekent worden of de development koopbaar is met een gold token

function calculateFullTokenAmount(ownTokens, bonuses) {
    const res = [];

    Object.entries(ownTokens).forEach((obj) => {
        const tokenName = obj[0];
        const tokenValue = obj[1];
        let bonusValue = 0;

        if (bonuses[tokenName] != null) {
            bonusValue = bonuses[tokenName];
        }

        res[tokenName] = tokenValue + bonusValue;
    })

    return res;
}

function isBuyable(priceDevCard, bonusAndOwnTokens) {
    let counter = 0;

    Object.entries(priceDevCard).forEach((obj) => {
        const name = obj[0];
        const value = obj[1];

        if (bonusAndOwnTokens[name] >= value ) {
            counter++;
        }
    })

    return counter === Object.entries(priceDevCard).length;
}

export { getListOfBuyableCards };