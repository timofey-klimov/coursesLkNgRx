import { IAnswerOption } from "./anwerOption.interface";
import { IQuestion } from "./question.interface";

export interface IQuestionWithAnswerOptions extends IQuestion {
    answerOptions: IAnswerOption[]
}