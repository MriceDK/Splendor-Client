function createReserveCardBody(cardNameOrLevel, level) {
    if (level) {
        return {
            "development": {
                "level": cardNameOrLevel
            }
        };
    } else {
        return {
            "development": {
                "name": cardNameOrLevel
            }
        };
    }
}

export {createReserveCardBody};