import { createAction, props } from "@ngrx/store";
import { IGetManagedStudentsRequest } from "../../types/getManagedStudents.request";
import { IGetManagedStudentsResponse } from "../../types/getManagedStudents.response";
import { ActionTypes } from "../actionsTypes";

export const getManagedStudentsAction = createAction(
    ActionTypes.GetManagedStudents,
    props<{request: IGetManagedStudentsRequest}>()
)

export const getManagedStudentsSuccessAction = createAction(
    ActionTypes.GetManagedStudentsSuccess,
    props<{response: IGetManagedStudentsResponse}>()
)

export const getManagedStudentsFailedAction = createAction(
    ActionTypes.GetManagedStudentsFailed,
    props<{message: string}>()
)