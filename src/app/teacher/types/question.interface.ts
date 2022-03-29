import { QuestionTypes } from "./questionTypes.enum";

export interface IQuestion {
    position: number,
    title: string,
    content: string,
    type: QuestionTypes
}