import { createAction, props } from "@ngrx/store";
import { ITeacher } from "src/app/shared/types/teacher.interface";
import {IGetTeachersRequest } from "../../types/getTeachers.request";
import { ActionTypes } from "../actionTypes";

export const getTeachersAction = createAction(
    ActionTypes.GetTeachers,
    props<{request: IGetTeachersRequest}>()
)
export const getTeachersAction_Success = createAction(
    ActionTypes.GetTeachers_Success,
    props<{response: ITeacher[]}>()
)
export const getTeachersAction_Failed = createAction(
    ActionTypes.GetTeachers_Failed,
    props<{message: string}>()
)