import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Store } from "@ngrx/store";
import { ICanDeactivateComponent } from "src/app/shared/guards/canDeactivate.component";
import { createTestAction } from "../../store/actions/createTest.action";
import { ICreateTestRequest } from "../../types/createTest.Request";
import { IQuestion } from "../../types/question.interface";
import { QuestionTypes } from "../../types/questionTypes.enum";
import { IQuestionWithAnswerOptions } from "../../types/questionWithAnwerOptions.interface";
import {NotificationService} from"../../../shared/services/notification.service"
import { IIconInput } from "src/app/shared/types/directives/iconInput.interface";

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
export class CreateTestComponent implements OnInit, ICanDeactivateComponent {

    titleForm: FormGroup;
    form: FormGroup;
    createdQuestionsForm: FormGroup;
    isTypeSelected: boolean;
    type: QuestionTypes;
    matcher: FormStateMatcher;
    editedQuestion: IQuestion;
    @ViewChild('readOnlyTemplate') readonlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTempalte: TemplateRef<any>;

    constructor(private store: Store, private notify: NotificationService) {
    }

    canDeactivate(): Promise<boolean> {
        return this.notify.canDeactivate('Данные не сохранятся');
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

    handleDelete(index: number): void {
        let question = this.editedQuestion as IQuestionWithAnswerOptions;
        let answerOptions = question.answerOptions.filter((element, elIndex) => {
            if (index != elIndex) {
                return element;
            }
        })
        question.answerOptions = answerOptions;
    }

    get questions(): Array<IQuestion> {
        let control = this.createdQuestionsForm.get('questions') as FormArray;

        return control.value as Array<IQuestion>;
    }

    set questions(updatedQuestions: Array<IQuestion>) {
        let control = this.createdQuestionsForm.get('questions') as FormArray;

        control.setValue(updatedQuestions);
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

    createTest(): void {
        const {title} = this.titleForm.value;
        const {questions} = this.createdQuestionsForm.value;

        const request: ICreateTestRequest = {title, questions};
        this.store.dispatch(createTestAction({request}));
    }

    loadTemplate(question:IQuestion): TemplateRef<any> {
       if (this.editedQuestion?.position === question.position) {
           return this.editTempalte;
       } else {
           return this.readonlyTemplate;
       }
    }

    edit(question: IQuestion): void {
        this.editedQuestion = question;
    }

    save(): void {
        this.questions = this.questions.filter((element, index) => {
            if (element.position === this.editedQuestion.position) {
                element = this.editedQuestion
            }

            return element;
        })
        this.editedQuestion = null;
    }
}