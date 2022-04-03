import { IGroup } from "src/app/shared/types/group.interface";
import { IPagination } from "src/app/shared/types/pagination.interface";
import { ITeacher } from "src/app/shared/types/teacher.interface";

export interface IGetGroupsResponse extends IPagination<IGroup>{
   
}