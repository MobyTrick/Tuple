import React, { useState, useEffect } from 'react'
import './style.css'
import dictionary from './dictionary'
import { TupleSettingsBox } from './TupleSettingsBox';
import { TupleGrid } from './TupleGrid';

export default () => {
    const [mode, setMode] = useState('classic')
    const [gameId, setGameId] = useState(null)
    const [wordSize, setWordSize] = useState('5')
    const [word, setWord] = useState(null)
    const dict = dictionary[wordSize]

    const onClick = () => {
        const randomIndex = Math.random() * dict.length
        const newWord = dict[Math.floor(randomIndex)]
        setWord(newWord)
        setGameId(Math.random() + "_ID")
    }

    const resetGame = () => {
        setGameId(null)
        setWord(null)
    }

    return <div className="application">
        <h1 className="tuple-header">Tuple!</h1>
         <TupleSettingsBox 
            mode={mode}
            gameId={gameId}
            onClick={onClick} 
            wordSize={wordSize} 
            setMode={setMode} 
            setWordSize={setWordSize}
            />

            <TupleGrid resetGame={resetGame} key={gameId} dictionary={dict} word={word} mode={mode}/>


    </div>

}

