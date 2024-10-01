import React, { useState } from 'react';
import { TupleRow } from "./TupleRow";
import { getGuessedLetters } from "./utils";


export const TupleGrid = ({ word, resetGame, dictionary, mode }: any) => {
    const [activeRow, setActiveRow] = useState(0);
    const [correct, setCorrect] = useState([]);

    if (!word) return <></>

    const setCorrectFn = (finalGuess) => {
        if (mode === 'hard') {
            correct.forEach((letter) => {
                if (!finalGuess.includes(letter)) {
                    alert("You Lost!");
                    resetGame();
                }
            });

            const guessedLetter = getGuessedLetters(finalGuess, word, correct);

            setCorrect(guessedLetter);

        }
    };
    const renderRows = (_: unknown, i: number): React.FC => <TupleRow
        mode={mode}
        key={`${word}-${i}}`}
        resetGame={resetGame}
        dictionary={dictionary}
        setActiveRow={setActiveRow}
        activeRow={activeRow}
        rowIndex={i}
        setCorrect={setCorrectFn}
        word={word} />;

    const rows = Array.from({ length: word.length + 1 }).map(renderRows);

    return <div className='tuple-grid-container'>
        <div className='tuple-grid'>
            {rows}
        </div>
    </div>
};
