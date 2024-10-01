import React, { useState, useEffect } from 'react'
import './style.css'
import dictionary from './dictionary'
import { useKey } from 'react-use';

function getBackgroundColor(guessedLetter: any, letter: string, done: any, word: string) {
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

const isAlphabetCharacter = (keyName) =>  { return /^[a-zA-Z]+$/.test(keyName) && keyName.length === 1 }

const deleteCharacter = (word) => {
    const newWord = word.split('')
    newWord.pop()
    return newWord.join('')
}

const TupleSettingsBox = ({ onClick, wordSize, setMode, setWordSize }) => {
    return <div className='tuple-start-box'>
        <div className='tuple-mode-row'>
        <button onClick={() => setMode('classic')}>
            Mode: Classic
        </button> 
        <button onClick={() => setMode('hard')}>
            Mode: Hard
        </button> 
        </div>
        <div className='tuple-mode-row'>
        <input onChange={e => setWordSize(e.target.value)} value={wordSize}  min="5" max="8" type="range"/>
            {wordSize}
        <button onClick={onClick}>Start</button>
        </div>
    </div>
}

const TupleBlock = ({done, word, letter, index, guess}: {word: string, letter: string, index: number, key?:string, guess:any}) => {
    const guessedLetter = guess[index]
    const showGreenLetter = getBackgroundColor(guessedLetter, letter, done, word);

    return <div style={{
        backgroundColor: showGreenLetter,
        width: '60px',
        height: '60px',
        margin: '1px',
        border: '3px solid #018e42'
    }}>
        {guessedLetter}
    </div>
}

const TupleRow = ({ setActiveRow, activeRow, word, rowIndex, dictionary, mode, setCorrect  }:any) => {
    const [guess, setGuess] = useState('')
    const [done, setDone] = useState(false)

    useKey((event) => {
        if(activeRow !== rowIndex) return false

        if(event.key === 'Enter' && guess.length === word.length ){
            setActiveRow(activeRow + 1)
            setDone(true)
            setCorrect(guess)
        }

        if(event.key === 'Backspace'){
            let newGuess = deleteCharacter(guess)
            setGuess(newGuess)
        } else if(isAlphabetCharacter(event.key)){
            let newGuess = guess + event.key.toLowerCase()
            if(guess.length < word.length){
                setGuess(newGuess)
            }
        }

        return true
    })

    const renderBlock: React.FC = (a, i) => <TupleBlock done={done} index={i} activeRow={activeRow} key={`key-${rowIndex}-${i}-${a}`} word={word} letter={a} guess={guess} />
    const columns = word.split('').map(renderBlock)

    return <div className='tuple-row'>
        {columns}
    </div>
}

const TupleGrid = ({ word, resetGame, dictionary, mode, setGameId}:any) => {

    const [activeRow, setActiveRow] = useState(0)
    const [correct, setCorrect] = useState([])

    if(!word) return 'unstarted';

    const setCorrectFn = (finalGuess) => {
        if(mode === 'hard'){
            correct.forEach((letter) => {
                if(!finalGuess.includes(letter)){
                    alert("You Lost!")
                    resetGame()
                }
            })

        let guessedLetter = []
        finalGuess.split('').forEach(e => {
            if(word.includes(e) && !correct.includes(e) ){
                guessedLetter.push(e)
            }
                
        });

        setCorrect(guessedLetter)

        }
    };
    const renderRows = (_: unknown, i: number): any => <TupleRow dictionary={dictionary} setActiveRow={setActiveRow} activeRow={activeRow} rowIndex={i} setCorrect={setCorrectFn}  word={word} />

    const rows = Array.from({ length: word.length + 1 }).map(renderRows)

    return <div className='tuple-grid'>
        {correct}
        {rows}
    </div>
}

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

    return <div  style={{backgroundColor: mode === 'hard' ? 'blue' : 'white'}} className="application">
        <h1 className="tuple-header">Tuple!</h1>
        {word ? <></> : <TupleSettingsBox 
            onClick={onClick} 
            wordSize={wordSize} 
            setMode={setMode} 
            setWordSize={setWordSize}
            />}

            <TupleGrid resetGame={resetGame} key={gameId} dictionary={dict} word={word} mode={mode}/>


    </div>

}