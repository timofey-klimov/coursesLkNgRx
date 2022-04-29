import { IPagination } from "src/app/shared/types/pagination.interface";
import { ITest } from "src/app/shared/types/test.interface";

export interface IGetTeacherTestsResponse extends IPagination<ITest> {
    
}