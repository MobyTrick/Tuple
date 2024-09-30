import React, { useState, useEffect } from 'react'
import './style.css'
import dictionary from './dictionary'
import { useKey } from 'react-use';


const isAlphabetCharacter = (keyName) =>  { return /^[a-zA-Z]+$/.test(keyName) && keyName.length === 1 }
const deleteCharacter = (word) => {
    const newWord = word.split('')
    newWord.pop()
    return newWord
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
        <input onChange={e => {
                return setWordSize(e.target.value)
            }} value={wordSize}  min="5" max="8" type="range"/>
            {wordSize}
        <button onClick={onClick}>Start</button>
        </div>
    </div>
}

const TupleBlock = ({word, letter, index, guess}: {word: string, letter: string, index: number, key?:string, guess:any}) => {
    return <div style={{
        width: '60px',
        height: '60px',
        margin: '1px',
        border: '3px solid #018e42'
    }}>
        { guess[index] }
    </div>
}

const TupleRow = ({ setActiveRow, activeRow, word, rowIndex,  setCorrect  }:any) => {
    const [guess, setGuess] = useState('')

    useKey((event) => {
        if(activeRow !== rowIndex) return false
        if(event.key === 'Enter' && guess.length === word.length ){
            setActiveRow(activeRow + 1)
        }

        if(event.key === 'Delete'){
            let newGuess = deleteCharacter(guess)
            setGuess(newGuess)
        } else if(isAlphabetCharacter(event.key)){
            let newGuess = guess + event.key.toUpperCase()
        console.log(newGuess, "e0e0e0e0e")
            setGuess(newGuess)
        }

        return true
    })

    const renderBlock: React.FC = (a, i) => <TupleBlock index={i} activeRow={activeRow} key={`key-${rowIndex}-${i}-${a}`} word={word} letter={a} guess={guess} />
    const columns = word.split('').map(renderBlock)

    return <div className='tuple-row'>
        {columns}
    </div>
}

const TupleGrid = ({ word}) => {

    const [activeRow, setActiveRow] = useState(0)
    const [correct, setCorrect] = useState([])

    if(!word) return 'unstarted';

    const setCorrectFn = (finalGuess) => {
        console.log(finalGuess);
        finalGuess.each(e => {
            return console.log(e);
        });

    };
    const renderRows = (_: unknown, i: number): any => <TupleRow setActiveRow={setActiveRow} activeRow={activeRow} rowIndex={i} setCorrect={setCorrectFn}  word={word} />

    const rows = Array.from({ length: word.length + 1 }).map(renderRows)

    return <div className='tuple-grid'>
        {rows}
    </div>
}

export default () => {
    // can be classic or hard
    const [mode, setMode] = useState('classic')
    const [wordSize, setWordSize] = useState('5')
    const [word, setWord] = useState(null)



    const onClick = () => {
        const dict = dictionary[wordSize]
        const randomIndex = Math.random() * dict.length
        const newWord = dict[Math.floor(randomIndex)]
        setWord(newWord)
    }

    return <div  style={{backgroundColor: mode === 'hard' ? 'blue' : 'white'}} className="application">
        <h1 className="tuple-header">Tuple!</h1>
        {word ? <></> : <TupleSettingsBox 
            onClick={onClick} 
            wordSize={wordSize} 
            setMode={setMode} 
            setWordSize={setWordSize} />}

            <TupleGrid word={word}/>


    </div>

}