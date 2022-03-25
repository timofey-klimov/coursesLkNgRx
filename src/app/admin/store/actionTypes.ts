export enum ActionTypes {
    GetManagedUsers = '[Admin] GetManagedUsers',
    GetManagedUsers_Success = '[Admin] GetManagedUsers_Success',
    GetManagedUsers_Fail = '[Admin] GetManagedUsers_Fail',

    CreateParticipant = '[Admin] CreateParticipant',
    CreateParticipant_Success = '[Admin] CreateParticipant_Success',
    CreateParticipant_Failed = '[Admin] CreateParticipant_Failed',

    BlockParticipant = '[Admin] BlockParticipant',
    BlockParticipant_Success = '[Admin] BlockParticipant_Success',
    BlockParticipant_Failed = '[Admin] BlockParticipant_Failed',

    UnBlockParticipant = '[Admin] UnBlockParticipant',
    UnBlockParticipantSuccess = '[Admin] UnBlockParticipantSuccess',
    UnBlockParticipantFailed = '[Admin] UnBlockParticipantFailed'
}