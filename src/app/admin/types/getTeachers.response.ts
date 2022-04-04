import { ITeacher } from "src/app/shared/types/teacher.interface";
import { IPagination } from "src/app/shared/types/pagination.interface";

export interface IGetTeachersResponse extends IPagination<ITeacher> {

}