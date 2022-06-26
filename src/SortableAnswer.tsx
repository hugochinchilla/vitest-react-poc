import React, {useState} from "react";

type SortableAnswerProps = {
    question: string;
    options: string[];
    solution: number[];
}

function moveAnswer(arr: string[], fromIndex: number, toIndex: number): string[] {
    var newArray = [...arr]
    var element = newArray[fromIndex];
    newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, element);

    return newArray;
}

export const SortableAnswer = ({question, options, solution}: SortableAnswerProps) => {

    const [answers, setAnswers] = useState(options);
    const moveAnswerDown = (index: number) => {
        setAnswers(moveAnswer(answers, index, index+1))
    }
    const moveAnswerUp = (index: number) => {
        setAnswers(moveAnswer(answers, index, index-1))
    }

    return (<>
        <div>{question}</div>
        <ol>
            {answers.map((option, index) => (
                <li key={index} role="answer">
                    <button role="move-up" onClick={() => moveAnswerUp(index)}></button>
                    <button role="move-down" onClick={() => moveAnswerDown(index)}></button>
                    {option}
                </li>
            ))}
        </ol>
    </>
)}