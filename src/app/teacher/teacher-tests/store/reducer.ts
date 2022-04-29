import { createReducer, on } from "@ngrx/store";
import { createTestAction, createTestFailedAction, createTestSuccessAction } from "./actions/createTest.action";
import { getTestsAction, getTestsFailedAction, getTestsSuccessAction } from "./actions/getTeacherTests.action";
import { initialTeacherTestsState } from "./teacher-tests.state";

export const reducer = createReducer(
    initialTeacherTestsState,
    on(getTestsAction, (state) => ({
        ...state,
        isLoading:true
    })),
    on(getTestsSuccessAction, (state, action) => ({
        ...state,
        isLoading: false,
        createdTests: action.response,
    })),
    on(getTestsFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(createTestAction, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(createTestSuccessAction, (state, action) => {
        const createdTests = [...state.createdTests.data, action.response]

        return {
            ...state,
            isLoading: false,
            createdTests: {
                data: createdTests,
                count: createdTests.length
            },
            createTest: {
                successCreated: true
            }
        }
    }),
    on(createTestFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
)