import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/shared/types/app.state";
import { ITeacherPageState } from "./states/teacher-page.state";

export const featureSelector = createFeatureSelector<IAppState, ITeacherPageState>('teacherPage');

export const isLoadingSelector = createSelector(featureSelector, (state) => state?.isLoading);

export const createdTestsSelector = createSelector(featureSelector, (state) => state?.createdTests);

export const groupsSelector = createSelector(featureSelector, (state) => state?.groups);

export const isLoadingGroupInfoSelector = createSelector(featureSelector, (state) => state?.groupInfo?.isLoading);

export const groupInfoSelector = createSelector(featureSelector, (state) => state?.groupInfo?.groupInfo);

export const groupInfoWasErrorSelector = createSelector(featureSelector, (state) => state?.groupInfo?.wasError);