import { createReducer, on } from "@ngrx/store";
import { UserState } from "src/app/shared/types/userState.enum";
import { groupInfoSelector } from "src/app/teacher/store/selector";
import { blockParticipantAction, blockParticipantFailedAction, blockParticipantSuccessAction } from "./action/blockParticipant.action";
import { createGroupAction, createGroupFailedAction, createGroupSuccessAction } from "./action/createGroup.action";
import { createParticipantAction, createParticipantFailedAction, createParticipantSuccessAction } from "./action/createParticipant.actions";
import { getAllStudentsAction, getAllStudentsAction_Failed, getAllStudentsAction_Success } from "./action/getAllStudents.action";
import { getStudyGroupInfoAction, getStudyGroupInfoFailedAction, getStudyGroupInfoSuccessAction } from "./action/getStudyGroupInfo.action";
import { getTeachersAction, getTeachersAction_Failed, getTeachersAction_Success } from "./action/getTeachers.actions";
import { getGroupsAction, getGroupsActionFailed, getGroupsActionSuccess } from "./action/manageGroups.action";
import { getParticipantsAction, getParticipantsFailAction, getParticipantsSuccessAction } from "./action/manageUsers.actions";
import { removeStudentsAction, removeStudentsAction_Failed, removeStudentsAction_Success } from "./action/removeStudents.action";
import { unblockParticipantAction, unblockParticipantFailedAction, unblockParticipantSuccessAction } from "./action/unblockParticipant.action";
import { IAdminPageState } from "./states/adminPage.state";
import { IGetGroupInfoState } from "./states/getGroupInfo.state";
import { IManageGroupState } from "./states/manageGroups.state";
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
    groupInfoState: initialGetGroupInfoState,
    currentPage: 0,
    itemsPerPage: 0
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

       const manageParticipantState = {
           ...state.manageParticipantsState,
           manageUsers: managedUsers
       }

        return {
            ...state,
            isLoading: false,
            manageParticipantsState: manageParticipantState
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
            manageParticipantsState: {
                manageUsers: managedUsers,
                itemsPerPage: state.manageParticipantsState.itemsPerPage,
                currentPage: state.manageParticipantsState.currentPage
            }
         };
    }),
    on(unblockParticipantFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(getGroupsAction, (state, action) => {
        
        const groupsState = {
            ...state.manageGroupState,
            currentPage: action.request.pageNumber,
            itemsPerPage: action.request.itemsPerPage
        }
        return {
            ...state,
            isLoading: true,
            manageGroupState: groupsState
        }
    }),
    on(getGroupsActionSuccess, (state, action) => {

        const managedGroups = {
            ...state.manageGroupState,
            manageGroups: action.groups
        }

        return {
            ...state,
            isLoading: false,
            manageGroupState: managedGroups
        }
    }),
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
    on(getTeachersAction_Success, (state, action) => {

        const managedGroupsState = {
            ...state.manageGroupState,
            availabledTeachers: action.response
        }

        return {
            ...state,
            isLoading: false,
            manageGroupState: managedGroupsState
        }
    }),
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
    on(getAllStudentsAction_Success,(state, action) => {

        const managedGroupsState = {
            ...state.manageGroupState,
            allStudents: action.response
        }

        return {
            ...state,
            isLoading: false,
            manageGroupState: managedGroupsState
        }
    }),
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
        let itemsCount = state.manageGroupState.manageGroups.count;
        let itemsPerPage = state.manageGroupState.itemsPerPage;
        let currentPage = state.manageGroupState.currentPage;

        if (currentPage * itemsPerPage > (itemsCount - itemsPerPage)) {
            const managedGroups = [...state.manageGroupState.manageGroups.data, action.group]

            const managedGroupState = {
                ...state.manageGroupState,
                manageGroups: {
                    data: managedGroups,
                    count: state.manageGroupState.manageGroups.count + 1
                }
            }

            return {
                ...state,
                isLoading: false,
                manageGroupState: managedGroupState
            }
        } else {

            const managedGroupState = {
                ...state.manageGroupState,
                manageGroups: {
                    data: state.manageGroupState.manageGroups.data,
                    count: state.manageGroupState.manageGroups.count + 1
                }
            }
            return {
                ...state,
                isLoading: false,
                manageGroupState: managedGroupState
                
            }
        }


    }),
    on(createGroupFailedAction, (state) => ({
        ...state,
        isLoading: false
    })),
    on(getStudyGroupInfoAction, (state) => {

        const getStudyGroupState = {
            ...state.manageGroupState,
            groupInfoState: {
                isLoading: true,
                wasError: false,
                groupInfo: null
            }
        }

        return {
            ...state,
            manageGroupState: getStudyGroupState
        }
    }),
    on(getStudyGroupInfoSuccessAction, (state,action) => {
        const getStudyGroupState = {
            ...state.manageGroupState,
            groupInfoState: {
                isLoading: false,
                wasError: false,
                groupInfo: action.groupInfo
            }
        }
        return {
            ...state,
            manageGroupState: getStudyGroupState
        }
    }),
    on(getStudyGroupInfoFailedAction, (state) => {

        const getStudyGroupState = {
            ...state.manageGroupState,
            groupInfoState: {
                isLoading: false,
                wasError: true,
                groupInfo: null
            }
        }

        return {
            ...state,
            manageGroupState: getStudyGroupState
        }
    }),
    on(removeStudentsAction, (state) => {
        const getStudyGroupState = {
            ...state.manageGroupState.groupInfoState,
            isLoading: true,
        }
        
        const managedGroupsState = {
            ...state.manageGroupState,
            groupInfoState: getStudyGroupState
        }

        return {
            ...state,
            manageGroupState: managedGroupsState
        }
    }),
    on(removeStudentsAction_Success, (state, action) => {
        
        const students = state.manageGroupState.groupInfoState.groupInfo.students
            .filter(x => !action.response.studentsId.includes(x.id))

            const groupInfo = {
                ...state.manageGroupState.groupInfoState.groupInfo,
                students: students
            }
            
            const getStudyGroupState = {
                ...state.manageGroupState.groupInfoState,
                isLoading: false,
                groupInfo: groupInfo
            }
            
            const managedGroupsState = {
                ...state.manageGroupState,
                groupInfoState: getStudyGroupState
            }
    
            return {
                ...state,
                manageGroupState: managedGroupsState
            }
    }),
    on(removeStudentsAction_Failed, (state) => {
        const getStudyGroupState = {
            ...state.manageGroupState.groupInfoState,
            isLoading: false,
        }
        
        const managedGroupsState = {
            ...state.manageGroupState,
            groupInfoState: getStudyGroupState
        }

        return {
            ...state,
            manageGroupState: managedGroupsState
        }
    })
)