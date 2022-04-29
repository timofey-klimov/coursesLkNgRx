import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/shared/types/app.state";
import { ITeacherTestsState } from "./teacher-tests.state";

export const featureSelector = createFeatureSelector<IAppState, ITeacherTestsState>('teacherTests');

export const isLoadingSelector = createSelector(featureSelector, (state) => state?.isLoading);

export const createdTestsSelector = createSelector(featureSelector, (state) => state?.createdTests);

export const successCreateTestSelector = createSelector(featureSelector, (state) => state?.createTest?.successCreated);