import React from 'react';
const getOutline = (mode, targetMode) => {
    return mode === targetMode ? '2px solid white' : 'none';
}

export const TupleSettingsBox = ({ onClick, wordSize, setMode, setWordSize, gameId, mode }) => {
    return <div style={{
        opacity: gameId ? .5 : 1,
        pointerEvents: gameId ? 'none' : 'inherit'
    }} className='tuple-start-box'>
        <div className='tuple-mode-row'>
            <input onChange={e => setWordSize(e.target.value)} value={wordSize} min="5" max="8" type="range" />
            <span className='word-range'>{wordSize} Letters</span>

            <button style={{
                border: getOutline(mode, 'classic')
            }} onClick={() => setMode('classic')}>
                Mode: Classic
            </button>
            <button style={{
                border: getOutline(mode, 'hard')
            }} onClick={() => setMode('hard')}>
                Mode: Hard
            </button>
            <button className='start-button' onClick={onClick}>Start</button>
        </div>
    </div>;
};
