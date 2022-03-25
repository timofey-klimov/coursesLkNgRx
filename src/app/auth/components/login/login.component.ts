import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { ICurrentUser } from "src/app/shared/types/currentUser.interface";
import { UserState } from "src/app/shared/types/userState.enum";
import { activateAction } from "../../store/actions/activate.actions";
import { loginAction } from "../../store/actions/login.actions";
import { errorSelector, isLoadingSelector, userSelector } from "../../store/selector";
import { ILoginRequest } from "../../types/loginRequest.interface";


export class LoginFormStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
        return control.touched && control.invalid;
    }
    
}

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

    form: FormGroup;
    isLoading$: Observable<boolean>;
    error$: Observable<string | null>;
    user$: Observable<ICurrentUser | null>;
    isFirstSignUp: boolean | null;
    subsription: Subscription;
    matcher: LoginFormStateMatcher;

    constructor(private store: Store) {

    }

    ngOnDestroy(): void {
        if (this.subsription) {
            this.subsription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.initializeVariables();

        this.subsription = this.user$.subscribe(user => {
            if (user?.state == UserState.Created) {
                this.isFirstSignUp = true;
                this.form = new FormGroup({
                    login: new FormControl({value: user.login, disabled: true}),
                    password: new FormControl({value: '*******', disabled: true}),
                    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
                })
            }
        })
    }

    onSubmit(): void {
        if (this.isFirstSignUp) {
            const password = this.form.get('newPassword').value;
            this.store.dispatch(activateAction({password}))

        } else {
            const loginRequest: ILoginRequest = this.form.value;
            this.store.dispatch(loginAction({request: loginRequest}))
        }
    }


    private initializeVariables(): void {
        this.form = new FormGroup({
            login: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        })

        this.isLoading$ = this.store.select(isLoadingSelector);
        this.error$ = this.store.select(errorSelector);
        this.user$ = this.store.select(userSelector);
        this.matcher = new LoginFormStateMatcher();
    }
}