import { IQuestion } from "../../../shared/types/questions/question.interface";

export interface ICreateTestRequest {
    title: string,
    questions: IQuestion[]
}