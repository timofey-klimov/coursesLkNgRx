import { ITeacher } from "./teacher.interface";

export interface IGroup {
    id: number,
    title: string,
    teacher: ITeacher,
    createDate: Date
}