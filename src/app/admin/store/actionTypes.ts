export enum ActionTypes {
    GetManagedParticipants = '[Admin] GetManagedParticipants',
    GetManagedParticipants_Success = '[Admin] GetManagedParticipants_Success',
    GetManagedParticipants_Fail = '[Admin] GetManagedParticipants_Fail',

    CreateParticipant = '[Admin] CreateParticipant',
    CreateParticipant_Success = '[Admin] CreateParticipant_Success',
    CreateParticipant_Failed = '[Admin] CreateParticipant_Failed',

    BlockParticipant = '[Admin] BlockParticipant',
    BlockParticipant_Success = '[Admin] BlockParticipant_Success',
    BlockParticipant_Failed = '[Admin] BlockParticipant_Failed',

    UnBlockParticipant = '[Admin] UnBlockParticipant',
    UnBlockParticipantSuccess = '[Admin] UnBlockParticipantSuccess',
    UnBlockParticipantFailed = '[Admin] UnBlockParticipantFailed',

    GetGroups = '[Admin] GetGroups',
    GetGroupsSuccess = '[Admin] GetGroupsSuccess',
    GetGroupsFailed = '[Admin] GetGroupsFailed'
}