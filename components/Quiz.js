import React, { useState, useEffect } from "react"
import { randomizeArr } from "../utilities.js"
import { decode } from 'html-entities'
import { nanoid } from "nanoid"

export default function Quiz(props) {
    const [randomOptions, setRandomOptions] = useState([])

    useEffect(() => {
        setRandomOptions(getRandomOptions())
    }, [props.incorrect])


    function getRandomOptions() {
        const newArr = [...props.incorrect, props.correct]
        const randomArr = randomizeArr(newArr)
        return randomArr
    }


    function mountOptions() {
        if (randomOptions) {
            const optionComponent = randomOptions.map((option, index) => {
                const decodedOption = decode(option)
                const isSelected = props.selectedValue === decodedOption
                return (
                    <p
                        key={index}
                        className={`option ${isSelected ? 'click' : ''}`}
                        onClick={props.answerClick}>
                        {decodedOption}
                    </p>)
            })
            return optionComponent
        }
    }


    function endQuizRendering() {
        if (randomOptions) {
            const optionComponent = randomOptions.map((option, index) => {
                const decodedOption = decode(option)
                const isSelected = props.selectedValue === decodedOption
                const isCorrect = props.correct === decodedOption
                return (
                    <p
                        key={index}
                        className={`option ${isSelected && isCorrect ? 'correct_selected' : isSelected && !isCorrect ? 'incorrect_selected' : !isSelected && isCorrect ? 'correct_unselected' : 'incorrect_unselected'}  `}
                    >
                        {decodedOption}
                    </p>)
            })

            return optionComponent
        }
    }


    return (
        <div className="question--cont">
            <p className="question">{props.question}</p>
            <div id={nanoid()} className="option--cont">
                {randomOptions.length && !props.endQuiz ? mountOptions() : endQuizRendering()}
            </div>
        </div>)
}