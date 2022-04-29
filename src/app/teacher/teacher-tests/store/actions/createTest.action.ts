import { createAction, props } from "@ngrx/store"
import { ITest } from "src/app/shared/types/test.interface"
import { ICreateTestRequest } from "src/app/teacher/teacher-tests/types/createTest.request"
import { ActionTypes } from "../actionTypes"

export const createTestAction = createAction(
    ActionTypes.CreateTest,
    props<{request: ICreateTestRequest}>()
)

export const createTestSuccessAction = createAction(
    ActionTypes.CreateTestSuccess,
    props<{response: ITest}>()
)

export const createTestFailedAction = createAction(
    ActionTypes.CreateTestFailed,
    props<{message: string}>()
)