import React from "react"

function randomizeArr(Array){
    
const newArray = [...Array]
        // Fisher-Yates shuffle algorithm
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = newArray[i]
        newArray[i] = newArray[j]
        newArray[j] = temp
    }
    return newArray
}




export {randomizeArr}