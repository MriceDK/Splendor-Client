function tokenInPurse(player, token, bonus = true){

    if (bonus){
        if(player.bonuses[token]){
            return player.tokens[token];
        } else {
            return 0
        }

    } else {

        if(player.tokens[token]){
            return player.tokens[token];
        } else {
            return 0;
        }



    }
    
}
export { tokenInPurse };