import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { UserState } from "src/app/shared/types/userState.enum";
import { blockParticipantAction, blockParticipantFailedAction, blockParticipantSuccessAction } from "./action/blockParticipant.action";
import { createGroupAction, createGroupFailedAction, createGroupSuccessAction } from "./action/createGroup.action";
import { createParticipantAction, createParticipantFailedAction, createParticipantSuccessAction } from "./action/createParticipant.actions";
import { getAllStudentsAction, getAllStudentsAction_Failed, getAllStudentsAction_Success } from "./action/getAllStudents.action";
import { getStudyGroupInfoAction, getStudyGroupInfoFailedAction, getStudyGroupInfoSuccessAction } from "./action/getStudyGroupInfo.action";
import { getTeachersAction, getTeachersAction_Failed, getTeachersAction_Success } from "./action/getTeachers.actions";
import { getGroupsAction, getGroupsActionFailed, getGroupsActionSuccess } from "./action/manageGroups.action";
import { getParticipantsAction, getParticipantsFailAction, getParticipantsSuccessAction } from "./action/manageUsers.actions";
import { unblockParticipantAction, unblockParticipantFailedAction, unblockParticipantSuccessAction } from "./action/unblockParticipant.action";
import { IAdminPageState } from "./states/admin-page.state";
import { IManageGroupState } from "./states/manage-group.state";


const initialManageGroupState: IManageGroupState = {
    availabledTeachers: null,
    manageGroups: null,
    allStudents: null,
    groupInfo: null
}

const initialState: IAdminPageState = {
    isLoading: false,
    manageUsers: null,
    error: null,
    manageGroupState: initialManageGroupState
}


export const reducer = createReducer(
    initialState,
    on(getParticipantsAction, (state) => ({
        ...state,
        isLoading: true,
        manageGroupState: initialManageGroupState
    })),
    on(getParticipantsSuccessAction, (state, action) => ({
        ...state,
        manageUsers: action.users,
        isLoading: false
    })),
    on(getParticipantsFailAction, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error
    })),
    on(createParticipantAction, (state) => ({
        ...state,
        isLoading: true,
        manageGroupState: initialManageGroupState
    })),
    on(createParticipantSuccessAction, (state, action) => {

        const managedUsers = {
            ...state.manageUsers,
            data: [...state.manageUsers.data, action.user]
        }

        return {
            ...state,
            isLoading: false,
            manageUsers: managedUsers
        }
    }),
    on(createParticipantFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(blockParticipantAction, (state) => ({
        ...state,
        isLoading: true,
        manageGroupState: initialManageGroupState
    })),
    on(blockParticipantSuccessAction, (state, action) => {

       const user = state.manageUsers.data.find(x => x.id == action.id);

       const updatedUser = {
           ...user,
           state: UserState.Blocked
       }

       const managedUsers = {
           ...state.manageUsers,
           data: state.manageUsers.data.map(user => {
               return user.id == action.id ? updatedUser : user;
           })
       }

        return {
            ...state,
            isLoading: false,
            manageUsers: managedUsers
        };
    }),
    on(blockParticipantFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(unblockParticipantAction, (state) => ({
        ...state,
        isLoading: true,
        manageGroupState: initialManageGroupState
    })),
    on(unblockParticipantSuccessAction, (state, action) => {
        const user = state.manageUsers.data.find(x => x.id == action.id);

        const updatedUser = {
            ...user,
            state: UserState.Active
        }
 
        const managedUsers = {
            ...state.manageUsers,
            data: state.manageUsers.data.map(user => {
                return user.id == action.id ? updatedUser : user;
            })
        }
 
         return {
             ...state,
             isLoading: false,
             manageUsers: managedUsers
         };
    }),
    on(unblockParticipantFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(getGroupsAction, (state) => ({
        ...state,
        isLoading: true,
        error: null,
        manageUsers: null
    })),
    on(getGroupsActionSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        manageGroupState: {
            manageGroups: action.groups,
            availabledTeachers: null,
            allStudents: null,
            groupInfo: null
        }
    })),
    on(getGroupsActionFailed, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.message
    })),
    on(getTeachersAction, (state) =>({
        ...state,
        isLoading: true,
        manageUsers: null 
    })),
    on(getTeachersAction_Success, (state, action) => ({
        ...state,
        isLoading: false,
        manageGroupState: {
            manageGroups: state.manageGroupState.manageGroups,
            availabledTeachers: action.response,
            allStudents: null,
            groupInfo: null
        }
    })),
    on(getTeachersAction_Failed, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.message
    })),
    on(getAllStudentsAction, (state) => ({
        ...state,
        isLoading: true,
        manageUsers: null
    })),
    on(getAllStudentsAction_Success,(state, action) => ({
        ...state,
        isLoading: false,
        manageGroupState: {
            manageGroups: state.manageGroupState.manageGroups,
            availabledTeachers: state.manageGroupState.availabledTeachers,   
            allStudents: action.response,
            groupInfo: null
       } 
    })),
    on(getAllStudentsAction_Failed, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.message
    })),
    on(createGroupAction, (state) => ({
        ...state,
        isLoading: true,
        manageUsers: null
    })),
    on(createGroupSuccessAction, (state,action) => {
        const groups = {
            ...state.manageGroupState.manageGroups,
            data: [...state.manageGroupState.manageGroups.data, action.group]
        }

        return {
            ...state,
            manageGroupState: {
                allStudents: null,
                manageGroups: groups,
                availabledTeachers: null,
                groupInfo: null
            },
            isLoading: false
        }
    }),
    on(createGroupFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(getStudyGroupInfoAction, (state) => ({
        ...state,
        isLoading: true,
        manageUsers: null
    })),
    on(getStudyGroupInfoSuccessAction, (state,action) => ({
        ...state,
        isLoading: false,
        manageGroupState: {
            allStudents: null,
            manageGroups: state.manageGroupState.manageGroups,
            groupInfo: action.groupInfo,
            availabledTeachers: null
        }
    })),
    on(getStudyGroupInfoFailedAction, (state) => ({
        ...state,
        isLoading: false
    }))
)