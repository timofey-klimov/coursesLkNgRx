import { createReducer, on } from "@ngrx/store";
import { getStudentInfoAction, getStudentInfoFailedAction, getStudentInfoSuccessAction } from "./actions/getStudentInfo.action";
import { getStudentsAction, getStudentsFailedAction, getStudentsSuccessAction } from "./actions/getStudents.action";
import { initialTeacherStudentsState } from "./teacher-students.state";

export const reducer = createReducer(
    initialTeacherStudentsState,
    on(getStudentsAction, (state) => ({
        ...state,
        isLoading: true
    })),
    on(getStudentsSuccessAction, (state, action) => ({
        ...state,
        students: action.response
    })),
    on(getStudentsFailedAction, (state) => ({
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