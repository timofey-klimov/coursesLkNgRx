import { createReducer, on } from "@ngrx/store";
import { createTestAction, createTestFailedAction, createTestSuccessAction } from "./actions/createTest.action";
import { getGroupsAction, getGroupsFailedAction, getGroupsSuccessAction } from "./actions/getGroups.action";
import { getTestsAction, getTestsFailedAction, getTestsSuccessAction } from "./actions/getTests.actions";
import { ITeacherPageState } from "./teacher-page.state";

const initialState: ITeacherPageState = {
    isLoading: false,
    createdTests: null,
    groups: null
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
        createdTests: action.response,
        groups: null
    })),
    on(getTestsFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(createTestAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(createTestSuccessAction, (state, action) => {

        const createdTests = [...state.createdTests.data, action.response]

        return {
            ...state,
            isLoading: false,
            createdTests: {
                data: createdTests,
                count: createdTests.length
            }
        }
    }),
    on(createTestFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(getGroupsAction, (state) => ({
        ...state,
        isLoading: true,
        createdTests: null
    })),
    on(getGroupsSuccessAction, (state, action) => ({
        ...state,
        isLoading: false,
        groups: action.response
    })),
    on(getGroupsFailedAction, (state) => ({
        ...state,
        isLoading: false
    }))
)