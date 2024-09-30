import React, { useState } from 'react'
import './style.css'
import dictionary from './dictionary'

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

const TupleBlock = ({word, letter}: {word: string, letter: string, key?:string}) => {
    return <div style={{
        width: '60px',
        height: '60px',
        margin: '1px',
        border: '3px solid #018e42'
    }}>

    </div>
}

const TupleRow = ({ word, rowIndex }) => {
    const renderBlock: React.FC = (a, i) => <TupleBlock key={`key-${rowIndex}-${i}-${a}`} word={word} letter={a} />
    const columns = word.split('').map(renderBlock)

    return <div className='tuple-row'>
        {columns}
    </div>
}

const TupleGrid = ({ word}) => {
    if(!word) return 'unstarted';

    const renderRows = (_: unknown, i: number): any => <TupleRow rowIndex={i} word={word} />

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


    return <div style={{backgroundColor: mode === 'hard' ? 'blue' : 'white'}} className="application">
        <h1 className="tuple-header">Tuple!</h1>
        {word ? <></> : <TupleSettingsBox 
            onClick={onClick} 
            wordSize={wordSize} 
            setMode={setMode} 
            setWordSize={setWordSize} />}

            <TupleGrid word={word}/>


    </div>

}