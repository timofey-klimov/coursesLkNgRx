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
    questions: IQuestion[]
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

        this.questions = [];
        this.matcher = new FormStateMatcher();
    }

    addQuestionWithOptionsInTest(): void {
        let question: IQuestionWithAnswerOptions = this.form.value;
        
        question = {
            ...question,
            position: this.questions.length + 1,
            type: QuestionTypes.WithAnswerOptions
        }

        this.questions.push(question);
        this.clearForm();
    }

    addQuestionWithTextInput(): void {
        let question: IQuestion = this.form.value;

        question = {
            ...question,
            position: this.questions.length + 1,
            type: QuestionTypes.WithTextInput
        }
        
        this.questions.push(question);
        this.clearForm();
    }

    addQuestionWithFileInput(): void {
        let question: IQuestion = this.form.value;

        question = {
            ...question,
            position: this.questions.length + 1,
            type: QuestionTypes.WithFileInput
        }

        this.questions.push(question);
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