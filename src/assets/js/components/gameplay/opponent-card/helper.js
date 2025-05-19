function getPrestigePointsPercentage (prestigePoints) {
    const WINNING_PRESTIGE_POINTS_AMOUNT = 15;
    return prestigePoints / 15 * 100;
}

export { getPrestigePointsPercentage }