import { IStudent } from "src/app/shared/types/student.interface";
import { ITeacher } from "src/app/shared/types/teacher.interface";

export interface IGetStudyGroupInfoResponse {
    title: string,
    createDate: Date,
    teacher: ITeacher,
    students: Array<IStudent>
}