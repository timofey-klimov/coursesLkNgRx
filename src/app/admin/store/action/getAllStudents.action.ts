import { createAction, props } from "@ngrx/store";
import { IStudent } from "src/app/shared/types/student.interface";
import { ActionTypes } from "../actionTypes";

export const getAllStudentsAction = createAction(
    ActionTypes.GetAllStudents,
)
export const getAllStudentsAction_Success = createAction(
    ActionTypes.GetAllStudents_Success,
    props<{response: IStudent[]}>()
)
export const getAllStudentsAction_Failed = createAction(
    ActionTypes.GetAllStudents_Failed,
    props<{message: string}>()
)