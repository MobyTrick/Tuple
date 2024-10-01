import React from 'react';
import { getBackgroundColor } from "./utils";

export const TupleBlock = ({ done, word, letter, index, guess }: { word: string; letter: string; index: number; key?: string; guess: string; done:boolean }) => {
    const guessedLetter = guess[index];
    const backgroundColor = getBackgroundColor(guessedLetter, letter, done, word);

    return <div className="tuple-block" style={{ backgroundColor }}>
        {guessedLetter}
    </div>;
};
