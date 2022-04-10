import { createReducer, on } from "@ngrx/store";
import { createTestAction, createTestFailedAction, createTestSuccessAction } from "./actions/createTest.action";
import { getGroupInfoAction, getGroupInfoFailedAction, getGroupInfoSuccessAction } from "./actions/getGroupInfo.action";
import { getGroupsAction, getGroupsFailedAction, getGroupsSuccessAction } from "./actions/getGroups.action";
import { getTestsAction, getTestsFailedAction, getTestsSuccessAction } from "./actions/getTests.actions";
import { IGroupInfoState } from "./states/groupInfo.state";
import { ITeacherPageState } from "./states/teacher-page.state";

const initialGroupInfoState: IGroupInfoState = {
    wasError: false,
    isLoading: false,
    groupInfo: null
}


const initialState: ITeacherPageState = {
    isLoading: false,
    createdTests: null,
    groups: null,
    groupInfo: initialGroupInfoState
}

export const reducer = createReducer(
    initialState,
    on(getTestsAction, (state) => ({
        ...state,
        isLoading: true,
        groupInfo: initialGroupInfoState
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
        groupInfo: initialGroupInfoState
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
    })
)