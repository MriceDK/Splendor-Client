import * as APIAbstractor from "./data-connector/api-communication-abstractor.js";
import {renderOpponentsStats} from "./opponent-card-component/renderer.js";
import {ownPlayerCardRenderer} from "./own-player-component/renderer.js";
import {renderActivePlayer} from "./active-player-component/renderer";
import * as LocalStorageAbstractor from "./data-connector/local-storage-abstractor.js";

function getGameInfo() {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    return APIAbstractor.fetchFromServer(`/games/${parseInt(gameId)}`,"GET")

    const JSONTemplate = {
        "gameId": 0,
        "gameName": null,
        "numberOfPlayers": 3,
        "returnExcessTokensRequired": false,
        "pickNobleRequired": false,
        "players": [
            {
                "name": "Alice",
                "tokens": {},
                "reserve": [],
                "built": [],
                "nobles": [],
                "bonuses": {},
                "totalPrestigePoints": 0
            },
            {
                "name": "Kegel",
                "tokens": {},
                "reserve": [],
                "built": [],
                "nobles": [],
                "bonuses": {},
                "totalPrestigePoints": 0
            },
            {
                "name": "Nathan",
                "tokens": {},
                "reserve": [],
                "built": [],
                "nobles": [],
                "bonuses": {},
                "totalPrestigePoints": 0
            }
        ],
        "market": [
            {
                "level": 1,
                "cardStackSize": 36,
                "visibleCards": [
                    {
                        "name": "Glistening Vault",
                        "level": 1,
                        "cost": {
                            "Ruby": 1,
                            "Onyx": 1,
                            "Emerald": 1,
                            "Sapphire": 1
                        },
                        "bonus": "Diamond",
                        "prestigePoints": 0
                    },
                    {
                        "name": "Blazing Workshop",
                        "level": 1,
                        "cost": {
                            "Onyx": 1,
                            "Emerald": 1,
                            "Sapphire": 1,
                            "Diamond": 1
                        },
                        "bonus": "Ruby",
                        "prestigePoints": 0
                    },
                    {
                        "name": "Facet Workshop",
                        "level": 1,
                        "cost": {
                            "Ruby": 1,
                            "Onyx": 1,
                            "Emerald": 2,
                            "Sapphire": 1
                        },
                        "bonus": "Diamond",
                        "prestigePoints": 0
                    },
                    {
                        "name": "Blue Crystal Cave",
                        "level": 1,
                        "cost": {
                            "Ruby": 1,
                            "Emerald": 3,
                            "Sapphire": 1
                        },
                        "bonus": "Sapphire",
                        "prestigePoints": 0
                    }
                ]
            },
            {
                "level": 2,
                "cardStackSize": 26,
                "visibleCards": [
                    {
                        "name": "Refined Gem Vault",
                        "level": 2,
                        "cost": {
                            "Ruby": 3,
                            "Emerald": 2,
                            "Diamond": 3
                        },
                        "bonus": "Emerald",
                        "prestigePoints": 1
                    },
                    {
                        "name": "Sapphire Vault",
                        "level": 2,
                        "cost": {
                            "Onyx": 3,
                            "Emerald": 3,
                            "Sapphire": 2
                        },
                        "bonus": "Sapphire",
                        "prestigePoints": 1
                    },
                    {
                        "name": "Noir Estate",
                        "level": 2,
                        "cost": {
                            "Diamond": 5
                        },
                        "bonus": "Onyx",
                        "prestigePoints": 2
                    },
                    {
                        "name": "Brilliant Collection",
                        "level": 2,
                        "cost": {
                            "Diamond": 6
                        },
                        "bonus": "Diamond",
                        "prestigePoints": 3
                    }
                ]
            },
            {
                "level": 3,
                "cardStackSize": 16,
                "visibleCards": [
                    {
                        "name": "Royal Onyx Chamber",
                        "level": 3,
                        "cost": {
                            "Ruby": 6,
                            "Onyx": 3,
                            "Emerald": 3
                        },
                        "bonus": "Onyx",
                        "prestigePoints": 4
                    },
                    {
                        "name": "Exquisite Sapphire Vault",
                        "level": 3,
                        "cost": {
                            "Onyx": 3,
                            "Sapphire": 3,
                            "Diamond": 6
                        },
                        "bonus": "Sapphire",
                        "prestigePoints": 4
                    },
                    {
                        "name": "Exquisite Diamond Vault",
                        "level": 3,
                        "cost": {
                            "Onyx": 7
                        },
                        "bonus": "Diamond",
                        "prestigePoints": 4
                    },
                    {
                        "name": "Exquisite Emerald Vault",
                        "level": 3,
                        "cost": {
                            "Sapphire": 7
                        },
                        "bonus": "Emerald",
                        "prestigePoints": 4
                    }
                ]
            }
        ],
        "unclaimedTokens": {
            "Ruby": 5,
            "Onyx": 5,
            "Emerald": 5,
            "Gold": 5,
            "Sapphire": 5,
            "Diamond": 5
        },
        "unclaimedNobles": [
            {
                "name": "Catherine de Medici",
                "neededBonuses": {
                    "Ruby": 3,
                    "Emerald": 3,
                    "Sapphire": 3
                },
                "prestigePoints": 3
            },
            {
                "name": "Henry VIII",
                "neededBonuses": {
                    "Ruby": 4,
                    "Onyx": 4
                },
                "prestigePoints": 3
            },
            {
                "name": "Niccolo Machiavelli",
                "neededBonuses": {
                    "Sapphire": 4,
                    "Diamond": 4
                },
                "prestigePoints": 3
            },
            {
                "name": "Anne of Brittany",
                "neededBonuses": {
                    "Emerald": 3,
                    "Sapphire": 3,
                    "Diamond": 3
                },
                "prestigePoints": 3
            }
        ],
        "active": true,
        "gameState": "TurnAction",
        "currentPlayer": "Alice",
        "winner": null,
        "started": true
    }
}



function init() {
    getGameInfo()
        .then(res => {
            renderOpponentsStats(res.players);
            ownPlayerCardRenderer(res); // TODO dit nog verder uitwerken
            // TODO render market:
                // TODO render development cards
                // TODO (not a must have) render nobles
            // TODO render token bank
            // TODO: Render current active player
            renderActivePlayer(res.currentPlayer)
        })

 }

 init();