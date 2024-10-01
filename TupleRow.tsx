import React, { useState } from 'react'
import { useKey } from 'react-use';
import { deleteCharacter, isAlphabetCharacter } from './utils';
import { TupleBlock } from './TupleBlock';

export const TupleRow = ({ 
    setActiveRow, 
    activeRow, 
    mode, 
    word, 
    rowIndex, 
    dictionary,  
    setCorrect, 
    resetGame  }: React.FC) => {
    const [guess, setGuess] = useState('')
    const [done, setDone] = useState(false)

    useKey((event) => {
        event.preventDefault()
        if(activeRow !== rowIndex) return false

        const guessInDictionary = dictionary.includes(guess) 
        if(event.key === 'Enter' && guess.length === word.length && guessInDictionary ){

            setActiveRow(activeRow + 1)
            if(mode === 'hard'){
                setCorrect(guess)
            }
            if(guess === word){
                alert("You won!")
                resetGame()
                return true
            } else if(activeRow === word.length){
                alert("You lost!")
                resetGame()
                return false
            }
            setDone(true)
        }

        if(event.key === 'Backspace'){
            let newGuess = deleteCharacter(guess)
            setGuess(newGuess)
        } else if(isAlphabetCharacter(event.key) && guess.length < word.length){
            let newGuess = guess + event.key.toLowerCase()
            if(guess.length <= word.length){
                setGuess(newGuess)
            }
        }

        return true
    })

    const renderBlock: React.FC = (a, i) => <TupleBlock 
        done={done} 
        index={i} 
        key={`key-${rowIndex}-${i}-${a}`} 
        word={word} 
        letter={a} 
        guess={guess} 
    />

    return <div className='tuple-row'>
        {word.split('').map(renderBlock)}
    </div>
}