import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/shared/types/app.state";
import { IAdminPageState } from "./states/admin-page.state";

export const adminPageFeatureSelector = createFeatureSelector<IAppState, IAdminPageState>('adminPage');

export const isLoadingSelector = createSelector(adminPageFeatureSelector, (state) => state?.isLoading);

export const managedUsersSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageUsers);

export const managedGroupsSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageGroupState?.manageGroups);

export const availabledTeachersSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageGroupState?.availabledTeachers);

export const allStudentsSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageGroupState?.allStudents);