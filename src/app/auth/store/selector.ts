import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppState } from "src/app/shared/types/app.state";
import { IAuthState } from "../types/auth.state";

export const authFeatureSelector = createFeatureSelector<IAppState, IAuthState>('auth');

export const isLoadingSelector = createSelector(authFeatureSelector, (state) => state.isLoading)

export const errorSelector = createSelector(authFeatureSelector, (state) => state.error);

export const userSelector = createSelector(authFeatureSelector, (state) => state?.user);

export const userAvatarSelector = createSelector(authFeatureSelector, (state) => state?.user?.avatar)