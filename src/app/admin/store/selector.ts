import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/shared/types/app.state";
import { IAdminPageState } from "./states/adminPage.state";

export const adminPageFeatureSelector = createFeatureSelector<IAppState, IAdminPageState>('adminPage');

export const isLoadingSelector = createSelector(adminPageFeatureSelector, (state) => state?.isLoading);

export const managedUsersSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageParticipantsState?.manageUsers);

export const managedGroupsSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageGroupState?.manageGroups);

export const availabledTeachersSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageGroupState?.availabledTeachers);

export const allStudentsSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageGroupState?.allStudents);

export const studyGroupInfoSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageGroupState?.groupInfoState?.groupInfo);

export const isLoadingStudyGroupInfoSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageGroupState?.groupInfoState?.isLoading);

export const wasErrorStudyGroupInfoSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageGroupState?.groupInfoState?.wasError)