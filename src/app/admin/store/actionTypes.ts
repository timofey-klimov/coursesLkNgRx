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
    GetGroupsFailed = '[Admin] GetGroupsFailed',

    GetTeachers = '[Admin] GetTeachers',
    GetTeachers_Success = '[Admin] GetTeachers_Success',
    GetTeachers_Failed = '[Admin] GetTeachers_Failed',

    GetAllStudents = '[Admin] GetAllStudents',
    GetAllStudents_Success = '[Admin] GetAllStudents_Success',
    GetAllStudents_Failed = '[Admin] GetAllStudents_Failed',

    CreateGroup = '[Admin] CreateGroup',
    CreateGroup_Success = '[Admin] CreateGroup_Success',
    CreateGroup_Failed = '[Admin] CreateGroup_Failed'
}