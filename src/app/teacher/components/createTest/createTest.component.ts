import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { IQuestion } from "../../types/question.interface";
import { QuestionTypes } from "../../types/questionTypes.enum";
import { IQuestionWithAnswerOptions } from "../../types/questionWithAnwerOptions.interface";

export class FormStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
        return control.touched && control.invalid;
    }
    
}

@Component({
    selector: 'createTest',
    templateUrl: './createTest.component.html',
    styleUrls: ['./createTest.component.scss']
})
export class CreateTestComponent implements OnInit{

    titleForm: FormGroup;
    form: FormGroup;
    createdQuestionsForm: FormGroup;
    isTypeSelected: boolean;
    type: QuestionTypes;
    matcher: FormStateMatcher;

    constructor() {
    }

    ngOnInit(): void {

        this.isTypeSelected = false;
        this.titleForm = new FormGroup({
            title: new FormControl('', Validators.required)
        })
        this.form = new FormGroup({
            content: new FormControl('', Validators.required),
            answerOptions: new FormArray([])
        })
        this.createdQuestionsForm = new FormGroup({
            questions: new FormArray([], Validators.required)
        })

        this.matcher = new FormStateMatcher();
    }

    get questions(): Array<IQuestion> {
        let control = this.createdQuestionsForm.get('questions') as FormArray;

        return control.value as Array<IQuestion>;
    }

    addQuestionWithOptionsInTest(): void {
        let questions = this.createdQuestionsForm.get('questions') as FormArray;
        
        let question: IQuestionWithAnswerOptions = this.form.value;
        
        question = {
            ...question,
            position: questions.length + 1,
            type: QuestionTypes.WithAnswerOptions
        }

        questions.push(new FormControl(question));
        this.clearForm();
    }

    addQuestionWithTextInput(): void {
        let questions = this.createdQuestionsForm.get('questions') as FormArray;

        let question: IQuestion = this.form.value;

        question = {
            ...question,
            position: questions.length + 1,
            type: QuestionTypes.WithTextInput
        }
        
        questions.push(new FormControl(question));
        this.clearForm();
    }

    addQuestionWithFileInput(): void {
        let questions = this.createdQuestionsForm.get('questions') as FormArray;

        let question: IQuestion = this.form.value;

        question = {
            ...question,
            position: questions.length + 1,
            type: QuestionTypes.WithFileInput
        }

        questions.push(new FormControl(question));        
        this.clearForm();
    }

    createAnswerOption(): void {
        const answers = <FormArray>this.form.get('answerOptions')
        const control = new FormGroup({
            content: new FormControl('', Validators.required),
            isCorrect: new FormControl(false)
        })
        
        answers.push(control);
    }

    changeQuestionType(type: string): void {
        this.type = QuestionTypes[type];
        this.isTypeSelected = true;
    }
    
    clearForm(): void {
        this.isTypeSelected = false;
        this.type = null;
        this.form = new FormGroup({
            content: new FormControl('', Validators.required),
            answerOptions: new FormArray([])
        })
    }
}