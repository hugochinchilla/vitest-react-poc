import React from 'react'
import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import matchers from '@testing-library/jest-dom'
expect.extend(matchers)


type SortableAnswerProps = {
    question: string;
    options: string[];
    solution: string;
}

const SortableAnswer = ({question, options, solution}: SortableAnswerProps) => (
    <div>what</div>
)


describe('A question with sortable answers', async () => {
    it("a question shows the answers", async () => {
        render(<SortableAnswer question="what" options={["a", "b", "c"]} solution="2,0,1" />)

        expect(screen.getByText('what')).toBeVisible()
    })
})