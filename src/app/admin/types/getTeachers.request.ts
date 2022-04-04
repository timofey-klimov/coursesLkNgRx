import { ITeacherFilter } from "src/app/shared/types/teacherFilter.interface";

export interface IGetTeachersRequest {
    limit: number;
    offset: number;
    filter: ITeacherFilter;
}