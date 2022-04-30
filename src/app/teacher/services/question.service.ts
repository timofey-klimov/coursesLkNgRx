import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IQuestion } from "../../shared/types/questions/question.interface";
import { QuestionTypes } from "../../shared/types/questions/questionTypes.enum";
import { IQuestionWithAnswerOptions } from "../../shared/types/questions/questionWithAnwerOptions.interface";

@Injectable()
export class QuestionService {
    public questionsForm: FormGroup;

    constructor() {
        this.questionsForm = new FormGroup({
            questions: new FormArray([], Validators.required)
        })
    }

    public get questions(): Array<IQuestion> {
       return this.questionsForm.get('questions').value as Array<IQuestion>;
    }
    
    public set questions(updatedQuestions: Array<IQuestion>) {
        let control = this.questionsForm.get('questions') as FormArray;
        control.setValue(updatedQuestions);
    }

    public addQuestion(question: IQuestion, type: QuestionTypes) {
        question = {
            ...question,
            type: type,
            position: this.questions.length + 1
        }

        let control = this.questionsForm.get('questions') as FormArray;
        control.push(new FormControl(question));
    }

    public removeQuestion(question: IQuestion): void {
        
        let control = this.questionsForm.get('questions') as FormArray;

        control.removeAt(--question.position);

        control.value.map((element: IQuestion, index) => {
            element.position = index;
        })
    }

    public updateQuestion(content: any, answerOptions: any, position: number): void {
        this.questions = this.questions.map((element: IQuestion) => {

            if (element.position === position) {
                (element as IQuestionWithAnswerOptions) = {
                    ...element,
                    content: content,
                    answerOptions: answerOptions
                }
            }
            return element;
        })
    }

    public isEmpty(): boolean {
        return this.questionsForm.invalid;
    }
}