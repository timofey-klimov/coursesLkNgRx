import { createAction, props } from "@ngrx/store";
import { IGetTeacherTestsRequest } from "../../types/getTests.request";
import { IGetTeacherTestsResponse } from "../../types/getTests.response";
import { ActionTypes } from "../actionsTypes";

export const getTestsAction = createAction(
    ActionTypes.GetTests,
    props<{request: IGetTeacherTestsRequest}>()
)

export const getTestsSuccessAction = createAction(
    ActionTypes.GetTestsSuccess,
    props<{response: IGetTeacherTestsResponse}>()
)

export const getTestsFailedAction = createAction(
    ActionTypes.GetTestsSuccess,
    props<{message: string}>()
)