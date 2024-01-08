import React from 'react'

export default function Intro(props){
    
    
    
    return (
        <div className="intro--cont">
            <h1 className="intro--title">Quizzical</h1>
            <p className="intro--description">Welcome to this quizz app where you can test your skills</p>
            <form className="selections--form">
                <div className="radios--cont"> 
                    <fieldset>
                        <legend>Difficulty level</legend>
                        <input 
                                type="radio"
                                id="easy"
                                name="level"
                                value="easy"
                                checked={props.level === "easy"}
                                onChange={props.onChange}
                        />
                        <label htmlFor="easy">Easy</label>
                        <br />
                                            
                        <input 
                                type="radio"
                                id="medium"
                                name="level"
                                value="medium"
                                checked={props.level === "medium"}
                                onChange={props.onChange}  
                        />
                        <label htmlFor="medium">Medium</label>
                        <br/>
                                            
                        <input 
                                type="radio"
                                id="hard"
                                name="level"
                                value="hard"
                                checked={props.level === "hard"}
                                onChange={props.onChange}
                        />
                        <label htmlFor="hard">Hard</label>
                        <br />
                    </fieldset>
                    <br />
                    <fieldset>
                        <legend>Number of questions</legend>
                        <input 
                                type="radio"
                                id="five"
                                name="number"
                                value="5"
                                checked={props.number === "5"}
                                onChange={props.onChange}
                        />
                        <label htmlFor="five">5</label>
                        <br />
                                            
                        <input 
                                type="radio"
                                id="ten"
                                name="number"
                                value="10"
                                checked={props.number === "10"}
                                onChange={props.onChange}
                        />
                        <label htmlFor="ten">10</label>
                        <br />
                                            
                        <input 
                                type="radio"
                                id="fifteen"
                                name="number"
                                value="15"
                                checked={props.number === "15"}
                                onChange={props.onChange}
                        />
                        <label htmlFor="fifteen">15</label>
                        <br/>
                    </fieldset>
                </div>
                <hr className="form--hr" />
                <label htmlFor="topics">Select the category of your questions</label>
                <select id="category" value={props.category} onChange={props.onChange} name="category">
                    <option value="random">Choose your category/randomize category</option>
                    <option value="21">Sports</option>
                    <option value="23">History</option>
                    <option value="22">Geography</option>
                    <option value="25">Art</option>
                    <option value="9">General Knowledge</option>
                </select>
            </form>
            <br/>
            <button className="intro--btn" onClick={props.startQuizBtn}>Start Quiz</button>
    </div>
    )
}