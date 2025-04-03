function createReserveCardBody(cardNameOrLevel, level) {
    // TODO: move this to a separate file
    if (level) {
        return {
            "development": {
                "level": cardNameOrLevel
            }
        }
    } else {
        return {
            "development": {
                "name": cardNameOrLevel
            }
        }
    }
}

export { createReserveCardBody };