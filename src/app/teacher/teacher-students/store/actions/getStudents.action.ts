import { createAction, props } from "@ngrx/store";
import { IGetManagedStudentsRequest } from "src/app/teacher/teacher-students/types/getManagedStudents.request";
import { IGetManagedStudentsResponse } from "src/app/teacher/teacher-students/types/getManagedStudents.response";
import { ActionTypes } from "../actionTypes";

export const getStudentsAction = createAction(
    ActionTypes.GetStudents,
    props<{request: IGetManagedStudentsRequest}>()
)

export const getStudentsSuccessAction = createAction(
    ActionTypes.GetStudentsSuccess,
    props<{response: IGetManagedStudentsResponse}>()
)

export const getStudentsFailedAction = createAction(
    ActionTypes.GetStudentsFailed,
    props<{message: string}>()
)