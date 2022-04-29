import { IQuestion } from "../../types/question.interface";

export interface ICreateTestRequest {
    title: string,
    questions: IQuestion[]
}