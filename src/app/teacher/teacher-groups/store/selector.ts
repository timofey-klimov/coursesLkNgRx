import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/shared/types/app.state";
import { ITeacherGroupsState } from "./teacheGroups.state";

export const featureSelector = createFeatureSelector<IAppState, ITeacherGroupsState>('teacherGroups');

export const isLoadingSelector = createSelector(featureSelector, (state) => state.isLoading);

export const groupsSelector = createSelector(featureSelector, (state) => state?.groups);

export const isLoadingGroupInfoSelector = createSelector(featureSelector, (state) => state?.groupInfo?.isLoading);

export const groupInfoWasErrorSelector = createSelector(featureSelector, (state) => state?.groupInfo?.wasError);

export const groupInfoSelector = createSelector(featureSelector, (state) => state?.groupInfo?.groupInfo);