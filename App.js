import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { randomizeArr } from "./utilities.js"
import { decode } from 'html-entities'
import Intro from './components/Intro'
import Quiz from './components/Quiz'
import dat from "./data.js"

export default function App() {
    const [selection, setSelection] = useState({
        level: "easy",
        number: "5",
        category: "random"
    })
    const [startQuiz, setStartQuiz] = useState(false)
    const [endQuiz, setEndQuiz] = useState(false)
    const [apiData, setApiData] = useState([])
    const [questionsArr, setQuestionsArr] = useState([])
    const [correctArr, setCorrectArr] = useState([])
    const [answersArr, setAnswersArr] = useState([])
    const [correctCount, setCorrectCount] = useState(0)
    const [clickCounterArr, setClickConterArr] = useState([])
    const [incompleteAnswers, setIncompleteAnswers] = useState(false)


    useEffect(() => {
        if (startQuiz) {
            // check if random is chosen and fetch a different url format
            const apiUrl = selection.category === "random" ? `https://opentdb.com/api.php?amount=${selection.number}&difficulty=${selection.level}` : `https://opentdb.com/api.php?amount=${selection.number}&category=${selection.category}&difficulty=${selection.level}`
            // fetch API asynchronous function
            fetch(apiUrl)
                .then(res => res.json())
                .then(data => setApiData(data.results))
        }
    }, [startQuiz])

    useEffect(() => {
        setQuestionsArr(fetchData())
    }, [apiData])


    useEffect(() => {
        // update the initial state of the clickCounter, answersArr and correctArr
        if (questionsArr.length) {
            setClickConterArr(new Array(questionsArr.length).fill(0))

            const initialAnswers = questionsArr.reduce((acc, curr) => {
                return { ...acc, [curr.questionId]: '' }
            }, {})
            setAnswersArr(initialAnswers)

            const correctAnswers = questionsArr.reduce((acc, question) => {
                return { ...acc, [question.questionId]: question.correct_answer };
            }, {})
            setCorrectArr(correctAnswers)
        }

    }, [questionsArr])

    // All the handle functions 

    function handleIntroChange(event) {
        const { name, value } = event.target
        setSelection(prevSelection => {
            return {
                ...prevSelection,
                [name]: value
            }
        })
    }

    function handleStartQuizBtn() {
        setStartQuiz(true)
    }
    
    function handleCannotDisplayResults() {
        setIncompleteAnswers(false)
    }

    function handleOptionsClick(event, optionId, index) {
        setClickConterArr(prevCountArr => {
            const modifiedArr = [...prevCountArr]
            modifiedArr[index] += 1
            return modifiedArr
        })

        setAnswersArr(prevAnswersArr => {
            return {
                ...prevAnswersArr,
                [optionId]: event.target.textContent
            }
        })
    }

    function handleDisplayResultsClick(event) {
        const allAnswered = questionsArr.every(element => answersArr[element.questionId] !== '')

        if (allAnswered) {
            if (event.target.textContent === 'Check answers') {
                const idArr = questionsArr.map(element => element.questionId)
                for (const id of idArr) {
                    answersArr[id] === correctArr[id] && setCorrectCount(prevCount => prevCount + 1)
                }
                setEndQuiz(true)
                event.target.textContent = "Play again"
            } else {
                setStartQuiz(false)
                setEndQuiz(false)
                setApiData([])
                setQuestionsArr([])
                setCorrectArr([])
                setAnswersArr([])
                setCorrectCount(0)
                setClickConterArr([])
                setIncompleteAnswers(false)
                setSelection({
                    level: "easy",
                    number: "5",
                    category: "random"
                })
            }

        } else {
            setIncompleteAnswers(true)
        }

    }

    

    function fetchData() {
        //    randomize data
        const shuffledArr = randomizeArr(apiData)
        //    set id to data to use it when loading the component
        const shuffledArrWithId = shuffledArr.map(element => {
            return {
                contId: nanoid(),
                questionId: nanoid(),
                ...element
            }
        })
        //    return array
        return shuffledArrWithId
    }

    function mountQuiz() {
        const components = questionsArr.map((element, index) => {
            const { contId, questionId, question, correct_answer, incorrect_answers } = element
            return (<div className="questions--cont" key={element.contId}>
                <Quiz
                    key={questionId}
                    question={decode(question)}
                    correct={decode(correct_answer)}
                    incorrect={incorrect_answers}
                    answerClick={(event) => handleOptionsClick(event, questionId, clickCounterArr[index], index)}
                    clickCounter={clickCounterArr[index]}
                    indexOfArr={index}
                    selectedValue={answersArr[questionId]}
                    endQuiz={endQuiz}
                />
                <hr />
            </div>)
        })
        return components

    }

// CONDITIONAL RENDERING OF INCOMPLETE ANSWER POP UP AND RESULTS
    function incompletePopUp() {
        return (
            <div id="unfinish--click" className="cannot--click">
                <div className="cannot--inner">
                    <p className="cannot--btn" onClick={handleCannotDisplayResults}>X</p>
                    <h3 className="cannot--h3">Not quite ready to click this button yet!</h3>
                    <hr />
                    <p className="cannot--p">Embarking on a quiz can be challenging, but keep in mind that the goal is to learn. Let's take a step back and ensure all options are selected before clicking this button. You're almost there!</p>
                </div>
            </div>
        )
    }

    function results() {
        return <p className="main--results">{`You scored ${correctCount}/5 correct answers`}</p>
    }



    return (
        <main>
            <img className="bckg--img top--img" src="./images/blobs_top.png" alt="background image top" />
            {incompleteAnswers && incompletePopUp()}
            {questionsArr.length ?
                (<>
                    {mountQuiz()}
                    <div className="btn--cont">
                        {endQuiz && results()}
                        <button className="main--btn" onClick={handleDisplayResultsClick}>Check answers</button>
                    </div>
                </>)
                :
                <Intro
                    key={nanoid()}
                    level={selection.level}
                    number={selection.number}
                    category={selection.random}
                    onChange={() => { handleIntroChange(event) }}
                    startQuizBtn={() => { handleStartQuizBtn() }}
                />
            }
            <img className="bckg--img bottom--img" src="./images/blobs_bottom.png" alt="background image top" />
        </main>
    )
}