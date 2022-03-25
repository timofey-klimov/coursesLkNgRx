import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/shared/types/app.state";
import { IAdminPageState } from "./admin-page.state";

export const adminPageFeatureSelector = createFeatureSelector<IAppState, IAdminPageState>('adminPage');

export const isLoadingSelector = createSelector(adminPageFeatureSelector, (state) => state?.isLoading);

export const managedUsersSelector = createSelector(adminPageFeatureSelector, (state) => state?.manageUsers);