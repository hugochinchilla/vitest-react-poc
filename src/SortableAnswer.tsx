import React, {useState} from "react";

type SortableAnswerProps = {
    question: string;
    options: string[];
    solution: number[];
}

function moveAnswer(arr: string[], fromIndex: number, toIndex: number): string[] {
    if (toIndex < 0) {
        return arr;
    }

    var newArray = [...arr]
    var element = newArray[fromIndex];
    newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, element);

    return newArray;
}

export function useSortableAnswers(initialAnswers: string[]) {
    const [answers, setAnswers] = useState(initialAnswers);

    const moveDown = (index: number) => {
        setAnswers(moveAnswer(answers, index, index+1))
    }

    const moveUp = (index: number) => {
        setAnswers(moveAnswer(answers, index, index-1))
    }

    return {answers, moveUp, moveDown}
}

export const SortableAnswer = ({question, options, solution}: SortableAnswerProps) => {

    const {moveUp, moveDown, answers} = useSortableAnswers(options)

    return (<>
        <div>{question}</div>
        <ol>
            {answers.map((option, index) => (
                <li key={index} role="answer">
                    <button role="move-up" onClick={() => moveUp(index)}>up</button>
                    <button role="move-down" onClick={() => moveDown(index)}>down</button>
                    {option}
                </li>
            ))}
        </ol>
    </>
)}