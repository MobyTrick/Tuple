export function getBackgroundColor(guessedLetter: any, letter: string, done: any, word: string) {
    const positionAndLetter = guessedLetter === letter;

    let showGreenLetter = 'white';
    if (positionAndLetter && done) {
        showGreenLetter = 'green';
    } else if (done && word.includes(guessedLetter)) {
        showGreenLetter = 'yellow';
    } else if (done) {
        showGreenLetter = 'grey';
    }
    return showGreenLetter;
}

export const isAlphabetCharacter = (keyName) => { return /^[a-zA-Z]+$/.test(keyName) && keyName.length === 1; };

export const deleteCharacter = (word) => {
    const newWord = word.split('');
    newWord.pop();
    return newWord.join('');
};

export function getGuessedLetters(finalGuess: any, word: any, correct: any) {
    let guessedLetter = [];
    finalGuess.split('').forEach(e => {
        if (word.includes(e) && !correct.includes(e)) {
            guessedLetter.push(e);
        }

    });
    return guessedLetter;
}