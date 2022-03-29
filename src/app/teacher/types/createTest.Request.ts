import { IQuestion } from "./question.interface";

export interface ICreateTestRequest {
    title: string,
    questions: IQuestion[]
}