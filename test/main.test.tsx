import React from 'react'
import {describe, expect, it} from "vitest";
import {act, getByRole, render, renderHook, screen, waitFor} from "@testing-library/react";
import matchers from '@testing-library/jest-dom'
import {SortableAnswer, useSortableAnswers} from "../src/SortableAnswer";

expect.extend(matchers)


describe('A question with sortable answers', async () => {
    it("the question is visible", async () => {
        const theQuestionText = "this is the question"

        render(<SortableAnswer
            question={theQuestionText}
            options={[]}
            solution={[]}
        />)

        expect(screen.getByText(theQuestionText)).toBeVisible()
    })

    it("the answers are visible", async () => {
        const theFirstOption = "a"
        const theSecondOption = "b"

        render(<SortableAnswer
            question={""}
            options={[theFirstOption, theSecondOption]}
            solution={[2,0,1]}
        />)

        expect(screen.getByText(theFirstOption)).toBeVisible()
        expect(screen.getByText(theSecondOption)).toBeVisible()
    })

    it("the answers are sorted as given", async () => {
        const theFirstOption = "a"
        const theSecondOption = "b"

        render(<SortableAnswer
            question={""}
            options={[theFirstOption, theSecondOption]}
            solution={[2,0,1]}
        />)

        const answers = screen.getAllByRole('answer')
        expect(answers[0]).toHaveTextContent(theFirstOption)
        expect(answers[1]).toHaveTextContent(theSecondOption)
    })

    describe('sorting answers', () => {
        it("the answers have up button", async () => {
            const theFirstOption = "a"
            const theSecondOption = "b"

            render(<SortableAnswer
                question={""}
                options={[theFirstOption, theSecondOption]}
                solution={[2, 0, 1]}
            />)

            const anyAnswer = screen.getAllByRole('answer')[0]
            expect(getByRole(anyAnswer, 'move-up')).toBeVisible()
        })
        it("the answers have down button", async () => {
            const theFirstOption = "a"
            const theSecondOption = "b"

            render(<SortableAnswer
                question={""}
                options={[theFirstOption, theSecondOption]}
                solution={[2, 0, 1]}
            />)

            const anyAnswer = screen.getAllByRole('answer')[0]
            expect(getByRole(anyAnswer, 'move-down')).toBeVisible()
        })
        it("click on down button, moves the answer down one position", async () => {
            const theFirstOption = "a"
            const theSecondOption = "b"
            render(<SortableAnswer
                question={""}
                options={[theFirstOption, theSecondOption]}
                solution={[2,0,1]}
            />)
            const firstAnswerDownButton = getByRole(screen.getByText(theFirstOption), 'move-down')

            await act(() => firstAnswerDownButton.click())

            const answers = screen.getAllByRole('answer')
            expect(answers[0]).toHaveTextContent(theSecondOption)
            expect(answers[1]).toHaveTextContent(theFirstOption)
        })
        it("click on up button, moves the answer up one position", async () => {
            const theFirstOption = "a"
            const theSecondOption = "b"
            render(<SortableAnswer
                question={""}
                options={[theFirstOption, theSecondOption]}
                solution={[2,0,1]}
            />)
            const lastAnswerUpButton = getByRole(screen.getByText(theSecondOption), 'move-up')

            await act(() => lastAnswerUpButton.click())

            const answers = screen.getAllByRole('answer')
            expect(answers[0]).toHaveTextContent(theSecondOption)
            expect(answers[1]).toHaveTextContent(theFirstOption)
        })
        it("trying to move up the first answer does nothing", async () => {
            const theFirstOption = "first"
            const theSecondOption = "second"
            render(<SortableAnswer
                question={""}
                options={[theFirstOption, theSecondOption]}
                solution={[2,0,1]}
            />)
            const firstAnswerUpButton = getByRole(screen.getByText(theFirstOption), 'move-up')

            await act(() => firstAnswerUpButton.click())

            const answers = screen.getAllByRole('answer')
            expect(answers[0]).toHaveTextContent(theFirstOption)
            expect(answers[1]).toHaveTextContent(theSecondOption)
        })
    })
})

describe("useSortableAnswers hook", () => {
    it('xxx', async () => {
        const {result} = renderHook(() =>
            useSortableAnswers(['a', 'b', 'c']))

        act(() => result.current.moveUp(0));

        expect(result.current.answers).toEqual(['a', 'b', 'c'])
    })
})