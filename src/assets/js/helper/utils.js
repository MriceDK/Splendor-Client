
function UppercaseFirstLetterOfWord(word) { // TODO in een aparte utils module stoppen
    return word.replace(word[0], word[0].toUpperCase());
}

export { UppercaseFirstLetterOfWord };