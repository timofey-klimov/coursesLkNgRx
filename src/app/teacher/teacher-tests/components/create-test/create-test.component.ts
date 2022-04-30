import { Location } from "@angular/common";
import { Component, TemplateRef, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { FormStateMatcher } from "src/app/shared/services/matcher.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { QuestionService } from "src/app/teacher/services/question.service";
import { ICreateTestRequest } from "src/app/teacher/teacher-tests/types/createTest.request";
import { IQuestion } from "src/app/shared/types/questions/question.interface";
import { QuestionTypes } from "src/app/shared/types/questions/questionTypes.enum";
import { IQuestionWithAnswerOptions } from "src/app/shared/types/questions/questionWithAnwerOptions.interface";
import { createTestAction } from "../../store/actions/createTest.action";
import { successCreateTestSelector } from "../../store/selector";

@Component({
    selector: 'create-test',
    templateUrl: './create-test.component.html',
    styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent {
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

    constructor(
        private store: Store, 
        private notify: NotificationService, 
        public questionService: QuestionService,
        public location: Location) {

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