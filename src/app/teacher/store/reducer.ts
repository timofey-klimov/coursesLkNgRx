import { createReducer, on } from "@ngrx/store";
import { getGroupInfoAction, getGroupInfoFailedAction, getGroupInfoSuccessAction } from "./actions/getGroupInfo.action";
import { getGroupsAction, getGroupsFailedAction, getGroupsSuccessAction } from "./actions/getGroups.action";
import { getManagedStudentsAction, getManagedStudentsFailedAction, getManagedStudentsSuccessAction } from "./actions/getManagedStudents.action";
import { getStudentInfoAction, getStudentInfoFailedAction, getStudentInfoSuccessAction } from "./actions/getStudentInfo.action";
import { initialCreateTestState } from "./states/createTest.state";
import { initialGetStudentInfoState } from "./states/getStudentInfo.state";
import { initialGroupInfoState } from "./states/groupInfo.state";
import { managedStudentsInitialState } from "./states/managedStudents.state";
import { ITeacherPageState } from "./states/teacher-page.state";


const initialState: ITeacherPageState = {
    isLoading: false,
    createdTests: null,
    groups: null,
    groupInfo: initialGroupInfoState,
    createTest: initialCreateTestState,
    managedStudents: managedStudentsInitialState,
    studentInfo: initialGetStudentInfoState,
}

export const reducer = createReducer(
    initialState,
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
    })),
    on(getStudentInfoAction, (state) => {
        const studentInfoState = {
            ...state.studentInfo,
            isLoading: true
        }

        return {
            ...state,
            studentInfo: studentInfoState
        }
    }),
    on(getStudentInfoSuccessAction, (state, action) => {
        const studentInfoState = {
            ...state.studentInfo,
            isLoading: false,
            student: action.response
        }

        return {
            ...state,
            studentInfo: studentInfoState
        }
    }),
    on(getStudentInfoFailedAction, (state) => {
        const studentInfoState = {
            ...state.studentInfo,
            isLoading: false,
            wasError: true
        }

        return {
            ...state,
            studentInfo: studentInfoState
        }
    })
)