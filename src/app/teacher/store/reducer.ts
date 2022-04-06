import { createReducer, on } from "@ngrx/store";
import { getTestsAction, getTestsFailedAction, getTestsSuccessAction } from "./actions/getTests.actions";
import { ITeacherPageState } from "./teacher-page.state";

const initialState: ITeacherPageState = {
    isLoading: false,
    createdTests: null
}

export const reducer = createReducer(
    initialState,
    on(getTestsAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(getTestsSuccessAction, (state, action) => ({
        ...state,
        isLoading: false,
        createdTests: action.response
    })),
    on(getTestsFailedAction, (state) => ({
        ...state,
        isLoading: false
    }))
)