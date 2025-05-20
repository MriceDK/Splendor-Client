function getPrestigePointsPercentage (prestigePoints) {
    const WINNING_PRESTIGE_POINTS_AMOUNT = 15;
    return prestigePoints / WINNING_PRESTIGE_POINTS_AMOUNT * 100;
}

export { getPrestigePointsPercentage }