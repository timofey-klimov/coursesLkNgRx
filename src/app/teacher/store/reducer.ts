import { createReducer, on } from "@ngrx/store";
import { createTestAction, createTestFailedAction, createTestSuccessAction } from "./actions/createTest.action";
import { getGroupInfoAction, getGroupInfoFailedAction, getGroupInfoSuccessAction } from "./actions/getGroupInfo.action";
import { getGroupsAction, getGroupsFailedAction, getGroupsSuccessAction } from "./actions/getGroups.action";
import { getManagedStudentsAction, getManagedStudentsFailedAction, getManagedStudentsSuccessAction } from "./actions/getManagedStudents.action";
import { getTestsAction, getTestsFailedAction, getTestsSuccessAction } from "./actions/getTests.actions";
import { initialCreateTestState } from "./states/createTest.state";
import { initialGroupInfoState } from "./states/groupInfo.state";
import { managedStudentsInitialState } from "./states/managedStudents.state";
import { ITeacherPageState } from "./states/teacher-page.state";


const initialState: ITeacherPageState = {
    isLoading: false,
    createdTests: null,
    groups: null,
    groupInfo: initialGroupInfoState,
    createTest: initialCreateTestState,
    managedStudents: managedStudentsInitialState
}

export const reducer = createReducer(
    initialState,
    on(getTestsAction, (state) => ({
        ...state,
        isLoading: true,
        groupInfo: initialGroupInfoState,
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
        isLoading: true,
        groupInfo: initialGroupInfoState,
        createTest: initialCreateTestState,
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
    on(getGroupsAction, (state) => ({
        ...state,
        isLoading: true,
        createdTests: null,
        groupInfo: initialGroupInfoState
    })),
    on(getGroupsSuccessAction, (state, action) => ({
        ...state,
        isLoading: false,
        groups: action.response
    })),
    on(getGroupsFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(getGroupInfoAction, (state) => {

        const groupInfoState = {
            ...state.groupInfo,
            isLoading: true
        }

        return {
            ...state,
            groupInfo: groupInfoState
        }
    }),
    on(getGroupInfoSuccessAction, (state, action) => {
        const groupInfoState = {
            ...state.groupInfo,
            isLoading: false,
            groupInfo: action.response
        }

        return {
            ...state,
            groupInfo: groupInfoState
        }
    }),
    on(getGroupInfoFailedAction, (state) => {
        const groupInfoState = {
            ...state.groupInfo,
            isLoading: false,
            wasError: true
        }

        return {
            ...state,
            groupInfo: groupInfoState
        }
    }),
    on(getManagedStudentsAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(getManagedStudentsSuccessAction, (state, action) => {
        
        const managedStudentsState = {
            ...state.managedStudents,
            students: action.response
        }
        return {
            ...state,
            isLoading: false,
            managedStudents: managedStudentsState
        }
    }
    ),

    on(getManagedStudentsFailedAction, (state) => ({
        ...state,
        isLoading: false
    }))
)