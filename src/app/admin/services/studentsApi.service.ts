import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponseWithData } from "src/app/shared/types/api-response/apiResponse.interface";
import { IStudent } from "src/app/shared/types/student.interface";
import { environment } from "src/environments/environment";
import { IGetStudentsRequest } from "../types/getStudents.request";
import { IGetStudentsResponse } from "../types/getStudents.response";

@Injectable()
export class StudentsApiService{
    constructor (private http: HttpClient){}

    getAllStudents(request: IGetStudentsRequest) : Observable<IApiResponseWithData<IGetStudentsResponse>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('offset', request.offset);
        httpParams = httpParams.append('limit', request.limit)
        return this.http.get<IApiResponseWithData<IGetStudentsResponse>>(`${environment.apiUrl}/students/all`, {
            params: httpParams
        })
    }
}