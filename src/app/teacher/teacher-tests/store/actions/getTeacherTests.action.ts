import { createAction, props } from "@ngrx/store"
import { IGetTeacherTestsRequest } from "src/app/teacher/teacher-tests/types/getTests.request"
import { IGetTeacherTestsResponse } from "src/app/teacher/teacher-tests/types/getTests.response"
import { ActionTypes } from "../actionTypes"

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