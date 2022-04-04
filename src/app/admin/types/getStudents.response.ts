import { IPagination } from "src/app/shared/types/pagination.interface";
import { IStudent } from "src/app/shared/types/student.interface";

export interface IGetStudentsResponse extends IPagination<IStudent> {
    
}