import { createReducer, on } from "@ngrx/store";
import { loginAction, loginFailAction, loginSuccessAction } from "./actions/login.actions";
import { IAuthState } from "../types/auth.state";
import { activateAction, activateFailAction, activateSuccessAction } from "./actions/activate.actions";
import { getUserAction, getUserFailedAction, getUserSuccessAction } from "./actions/getUser.actions";
import { getUserAvatarSuccess } from "./actions/getUserAvatar.action";

export const initialState: IAuthState = {
    isLoggedIn: null,
    isLoading: false,
    user: null,
    error: null,
}

export const authReducer = createReducer(
    initialState,
    on(loginAction, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(loginSuccessAction, (state, action) => {

        const user = {
            ...state.user,
            login: action.user.login,
            name: action.user.name,
            surname: action.user.surname,
            role: action.user.role,
            state: action.user.state,
            avatar: state?.user?.avatar
        }

        return {
            ...state,
            isLoading: false,
            user: user,
            isLoggedIn: true
        }
    }),
    on(loginFailAction, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error,
        isLoggedIn: false
    })),
    on(activateAction, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(activateSuccessAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(activateFailAction, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error
    })),
    on(getUserAction, (state) => ({
        ...state,
        user: null,
        isLoading: true
    })),
    on(getUserSuccessAction, (state, action) => {

        const user = {
            ...state.user,
            login: action.user.login,
            name: action.user.name,
            surname: action.user.surname,
            role: action.user.role,
            state: action.user.state,
            avatar: state?.user?.avatar
        }

        return {
            ...state,
            isLoading: false,
            user: user,
            isLoggedIn: true
        }
    }),
    on(getUserFailedAction, (state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: false
    })),
    on(getUserAvatarSuccess, (state, action) => {

        const user = {
            ...state.user,
            avatar: action.response
        }

        return {
            ...state,
            user: user
        }
    })
)