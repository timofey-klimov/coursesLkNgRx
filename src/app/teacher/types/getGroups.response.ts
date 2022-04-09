import { IPagination } from "src/app/shared/types/pagination.interface";
import { IStudyGroupWithStudentsCount } from "src/app/shared/types/studyGroupWithStudentsCount.interface";

export interface IGetGroupsResponse extends IPagination<IStudyGroupWithStudentsCount> {

}