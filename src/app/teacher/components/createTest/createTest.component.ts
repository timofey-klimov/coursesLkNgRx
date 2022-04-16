import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
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
import { QuestionService } from "../../services/question.service";
import { Observable, of, Subscription } from "rxjs";
import { successCreateTestSelector } from "../../store/selector";

export class FormStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
        return control.touched && control.invalid;
    }
    
}

@Component({
    selector: 'createTest',
    templateUrl: './createTest.component.html',
    styleUrls: ['./createTest.component.scss'],
    providers: [QuestionService]
})
export class CreateTestComponent implements OnInit, ICanDeactivateComponent, OnDestroy {

    subscription: Subscription;
    successCreated: boolean;
    titleForm: FormGroup;
    form: FormGroup;
    editQuestionForm: FormGroup;
    isTypeSelected: boolean;
    type: QuestionTypes;
    matcher: FormStateMatcher;
    editedQuestion: IQuestion;
    @ViewChild('readOnlyTemplate') readonlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTempalte: TemplateRef<any>;

    constructor(private store: Store, private notify: NotificationService, public questionService: QuestionService) {

    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    async canDeactivate(): Promise<boolean> {
        if (!this.successCreated) {
            return this.notify.canDeactivate('Данные не сохранятся');
        } else {
            return true;
        }
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
        this.matcher = new FormStateMatcher();
        this.subscription = this.store.select(successCreateTestSelector)
            .subscribe(x => this.successCreated = x);
        
    }

    addQuestionWithOptionsInTest(): void {
        let question: IQuestionWithAnswerOptions = this.form.value;
        this.questionService.addQuestion(question, QuestionTypes.WithAnswerOptions);
        this.clearForm();
    }
    
    addQuestionWithTextInput(): void {
        let question: IQuestion = this.form.value;
        this.questionService.addQuestion(question, QuestionTypes.WithTextInput);
        this.clearForm();
    }
    
    addQuestionWithFileInput(): void {
        let question: IQuestion = this.form.value;
        this.questionService.addQuestion(question, QuestionTypes.WithFileInput);      
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
        const questions = this.questionService.questions;
        
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
        this.editQuestionForm = new FormGroup({
            content: new FormControl(question.content, Validators.required),
            answerOptions: new FormArray((question as IQuestionWithAnswerOptions)?.answerOptions?.map(x => {
                let formGroup = new FormGroup({
                    content: new FormControl(x.content, Validators.required),
                    isCorrect: new FormControl(x.isCorrect, Validators.required)
                })
                return formGroup;
            }))
        })
        
        this.editedQuestion = question;
    }
    
    handleDelete(index: number): void {
        let anwerOptions = this.editQuestionForm.get('answerOptions') as FormArray;
       anwerOptions.removeAt(index);
    }

    save(): void {
        const {answerOptions} = this.editQuestionForm.value;
        const {content} = this.editQuestionForm.value;
        this.questionService.updateQuestion(content, answerOptions, this.editedQuestion.position);
        this.editedQuestion = null;
    }

    removeQuestion(question: IQuestion): void {
        this.questionService.removeQuestion(question);
    }

    editCreateAnswerOption(): void {
        const answers = <FormArray>this.editQuestionForm.get('answerOptions')
        const control = new FormGroup({
            content: new FormControl('', Validators.required),
            isCorrect: new FormControl(false)
        })
        answers.push(control);
    }
}