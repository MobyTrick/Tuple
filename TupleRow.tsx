import React, { useState } from 'react'
import { useKey } from 'react-use';
import { deleteCharacter, isAlphabetCharacter } from './utils';
import { TupleBlock } from './TupleBlock';

export const TupleRow = ({ setActiveRow, activeRow, word, rowIndex, dictionary,  setCorrect, resetGame  }: React.FC) => {
    const [guess, setGuess] = useState('')
    const [done, setDone] = useState(false)

    useKey((event) => {
        if(activeRow !== rowIndex) return false

        const guessInDictionary = dictionary.includes(guess) 
        if(event.key === 'Enter' && guess.length === word.length && guessInDictionary ){

            setActiveRow(activeRow + 1)
            setDone(true)
            if(guess === word){
                alert("You won!")
                resetGame()
                return true
            } else if(activeRow === word.length - 1){
                alert("You lost!")
                resetGame()
                return false
            }
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