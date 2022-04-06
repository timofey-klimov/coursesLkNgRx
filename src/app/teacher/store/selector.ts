import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/shared/types/app.state";
import { ITeacherPageState } from "./teacher-page.state";

export const featureSelector = createFeatureSelector<IAppState, ITeacherPageState>('teacherPage');

export const isLoadingSelector = createSelector(featureSelector, (state) => state?.isLoading);

export const createdTestsSelector = createSelector(featureSelector, (state) => state?.createdTests);