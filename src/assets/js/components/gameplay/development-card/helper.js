function getAllDevCardsFromMarket(market) {
    const cards = [];

    market.forEach(level => {

        level.visibleCards.forEach(card => {
            cards.push(card);
        })

    })

    return cards;
}

function getListOfBuyableCards(market, player) {
    const list = [];

    const marketCards = getAllDevCardsFromMarket(market);
    const reservedCards = player.reserve;
    const cards = marketCards.concat(reservedCards);

    const bonusAndOwnTokens = mergeTokensAndBonuses(player.tokens, player.bonuses);
    const goldenTokens = player.tokens["Gold"];

    cards.forEach(card => {
        if (isBuyable(card.cost, bonusAndOwnTokens, goldenTokens)) {

            list.push(card.name);
        }

    })

    return list;

}

// TODO schrijf een functie die uitrekent hoeveel tokens er nog nodig zijn zodat er kan berekent worden of de development koopbaar is met een gold token

function mergeTokensAndBonuses(tokens, bonuses) {
    const res = [];

    Object.entries(tokens).forEach((obj) => {
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

function isBuyable(priceDevCard, tokensAndBonuses, goldenTokens) {

    const tokensStillNeeded = getNeededTokens(priceDevCard, tokensAndBonuses);

    if (tokensStillNeeded === 0) {
        return true;
    } else return hasEnoughGold(goldenTokens, tokensStillNeeded);

}

function hasEnoughGold(goldenTokens, tokensStillNeeded) {
    return goldenTokens >= tokensStillNeeded;
}

function getNeededTokens(priceDevCard, bonusAndOwnTokens) {
    let tokensStillNeeded = 0;

    Object.entries(priceDevCard).forEach((obj) => {
        const name = obj[0];
        const value = obj[1];

        if (bonusAndOwnTokens[name] < value ) {
            const tokensNeeded = value - bonusAndOwnTokens;
            tokensStillNeeded += tokensNeeded;
        }
    });

    return tokensStillNeeded;
}

export { getListOfBuyableCards };