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
import { IGetGroupInfoState } from "./states/getGroupInfo.state";
import { IManageGroupState } from "./states/manage-group.state";
import { IManageParticipantsState } from "./states/manageParticipants.state";

const initialGetGroupInfoState: IGetGroupInfoState = {
    isLoading: false,
    wasError: false,
    groupInfo: null
}

const initialManageGroupState: IManageGroupState = {
    availabledTeachers: null,
    manageGroups: null,
    allStudents: null,
    groupInfoState: initialGetGroupInfoState
}

const initialManageParticipantState: IManageParticipantsState = {
    manageUsers: null,
    currentPage: 0,
    itemsPerPage: 0
}

const initialState: IAdminPageState = {
    isLoading: false,
    error: null,
    manageParticipantsState: initialManageParticipantState,
    manageGroupState: initialManageGroupState
}

export const reducer = createReducer(
    initialState,
    on(getParticipantsAction, (state, action) => ({
        ...state,
        isLoading: true,
        manageGroupState: initialManageGroupState,
        manageParticipantsState: {
            manageUsers: state.manageParticipantsState.manageUsers,
            itemsPerPage: action.request.itemsPerPage,
            currentPage: action.request.currentPage
        }
    })),
    on(getParticipantsSuccessAction, (state, action) => {

        const managedParticipants = {
            ...state.manageParticipantsState,
            manageUsers: action.users
        }

        return {
            ...state,
            isLoading: false,
            manageParticipantsState: managedParticipants
        }
    }),
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

        let itemsCount = state.manageParticipantsState.manageUsers.count;
        let itemsPerPage = state.manageParticipantsState.itemsPerPage;
        let currentPage = state.manageParticipantsState.currentPage;

        if (currentPage * itemsPerPage > (itemsCount - itemsPerPage)) {
            const managedUsers = [...state.manageParticipantsState.manageUsers.data, action.user]
            return {
                ...state,
                isLoading: false,
                manageParticipantsState: {
                    manageUsers: {
                        data: managedUsers,
                        count: state.manageParticipantsState.manageUsers.count + 1
                    },
                    currentPage: state.manageParticipantsState.currentPage,
                    itemsPerPage: state.manageParticipantsState.itemsPerPage
                }
            }
        } else {
            return {
                ...state,
                isLoading: false,
                manageParticipantsState: {
                    manageUsers: {
                        data: state.manageParticipantsState.manageUsers.data,
                        count: state.manageParticipantsState.manageUsers.count + 1
                    },
                    currentPage: state.manageParticipantsState.currentPage,
                    itemsPerPage: state.manageParticipantsState.itemsPerPage
                }
            }
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

       const user = state.manageParticipantsState.manageUsers.data.find(x => x.id == action.id);

       const updatedUser = {
           ...user,
           state: UserState.Blocked
       }

       const managedUsers = {
           ...state.manageParticipantsState.manageUsers,
           data: state.manageParticipantsState.manageUsers.data.map(user => {
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
        const user = state.manageParticipantsState.manageUsers.data.find(x => x.id == action.id);

        const updatedUser = {
            ...user,
            state: UserState.Active
        }
 
        const managedUsers = {
            ...state.manageParticipantsState.manageUsers,
            data: state.manageParticipantsState.manageUsers.data.map(user => {
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
        manageParticipantsState: initialManageParticipantState
    })),
    on(getGroupsActionSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        manageGroupState: {
            manageGroups: action.groups,
            availabledTeachers: null,
            allStudents: null,
            groupInfoState: initialGetGroupInfoState
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
        manageParticipantsState: initialManageParticipantState 
    })),
    on(getTeachersAction_Success, (state, action) => ({
        ...state,
        isLoading: false,
        manageGroupState: {
            manageGroups: state.manageGroupState.manageGroups,
            availabledTeachers: action.response,
            allStudents: null,
            groupInfoState: initialGetGroupInfoState
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
        manageParticipantsState: initialManageParticipantState
    })),
    on(getAllStudentsAction_Success,(state, action) => ({
        ...state,
        isLoading: false,
        manageGroupState: {
            manageGroups: state.manageGroupState.manageGroups,
            availabledTeachers: state.manageGroupState.availabledTeachers,   
            allStudents: action.response,
            groupInfoState: initialGetGroupInfoState
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
        manageParticipantsState: initialManageParticipantState
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
                groupInfoState:initialGetGroupInfoState
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
        manageUsers: null,
        manageGroupState: {
            availabledTeachers: null,
            allStudents: null,
            manageGroups: state.manageGroupState.manageGroups,
            groupInfoState: {
                isLoading: true,
                wasError: false,
                groupInfo: null
            }
        }
       
    })),
    on(getStudyGroupInfoSuccessAction, (state,action) => ({
        ...state,
        manageGroupState: {
            allStudents: null,
            manageGroups: state.manageGroupState.manageGroups,
            availabledTeachers: null,
            groupInfoState: {
                isLoading: false,
                wasError: false,
                groupInfo: action.groupInfo
            }
        }
    })),
    on(getStudyGroupInfoFailedAction, (state) => ({
        ...state,
        manageGroupState: {
            allStudents: null,
            manageGroups: state.manageGroupState.manageGroups,
            availabledTeachers: null,
            groupInfoState: {
                isLoading: false,
                wasError: true,
                groupInfo: null
            }
        }
    }))
)