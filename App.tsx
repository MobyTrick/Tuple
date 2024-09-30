import React, { useState } from 'react'
import './style.css'

const TupleStartBox = ({ setGame }) => {
    // can be classic or hard
    const [mode, setMode] = useState('classic')
    const [rowSize, setRowSize] = useState(5)

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
        <input onChange={e => console.log(e)} min="5" max="8" type="range"/>
        </div>
        <div className='tuple-mode-row'>
        <button onClick={() => setMode('hard')}>
            Start
        </button> 
        </div>
    </div>
}

const TupleBlock = () => <div style={{
    width: '10px',
    height: '10px',
    margin: '1px',
    backgroundColor: 'red'
}}></div>

const TupleRow = () => {
    return [1,2,3,4,5,6].map((a,i) => <TupleBlock key={i + "key"}/>)
}

const TupleBody = () => {
    return <div className='tuple-body'>
            <TupleRow/>
    </div>
}

const TupleHeader = () => {
    return <h1 className="tuple-header">Tuple!</h1>
}

export default () => {


    return <div className="application">
        <TupleHeader />
        <TupleStartBox />
        <TupleBody />
    </div>
}