import { IGetStudentsResponse } from "src/app/admin/types/getStudents.response";
import { IGetManagedStudentsResponse } from "../../types/getManagedStudents.response";

export interface IManagedStudentsState {
    students: IGetManagedStudentsResponse
}

export const managedStudentsInitialState: IManagedStudentsState = {
    students: null
}
