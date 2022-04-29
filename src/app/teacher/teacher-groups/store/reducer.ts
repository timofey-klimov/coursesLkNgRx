import { createReducer, on } from "@ngrx/store";
import { getGroupInfoAction, getGroupInfoFailedAction, getGroupInfoSuccessAction } from "./actions/getGroupInfo.action";
import { getGroupsAction, getGroupsFailedAction, getGroupsSuccessAction } from "./actions/getGroups.action";
import { initialTeacherGroupsState } from "./teacheGroups.state";

export const reducer = createReducer(
    initialTeacherGroupsState,
    on(getGroupsAction, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(getGroupsSuccessAction, (state, action) => ({
        ...state,
        isLoading: false,
        groups: action.response
    })),
    on(getGroupsFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(getGroupInfoAction, (state) => {

        const groupInfoState = {
            ...state.groupInfo,
            isLoading: true
        }

        return {
            ...state,
            groupInfo: groupInfoState
        }
    }),
    on(getGroupInfoSuccessAction, (state, action) => {
        const groupInfoState = {
            ...state.groupInfo,
            isLoading: false,
            groupInfo: action.response
        }

        return {
            ...state,
            groupInfo: groupInfoState
        }
    }),
    on(getGroupInfoFailedAction, (state) => {
        const groupInfoState = {
            ...state.groupInfo,
            isLoading: false,
            wasError: true
        }

        return {
            ...state,
            groupInfo: groupInfoState
        }
    }),
)