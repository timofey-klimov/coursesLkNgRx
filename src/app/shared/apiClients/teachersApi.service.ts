import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponseWithData } from "src/app/shared/types/api-response/apiResponse.interface";
import { IGetTeacherTestsRequest } from "src/app/teacher/types/getTests.request";
import { IGetTeacherTestsResponse } from "src/app/teacher/types/getTests.response";
import { environment } from "src/environments/environment";
import { IGetTeachersRequest } from "../../admin/types/getTeachers.request";
import { IGetTeachersResponse } from "../../admin/types/getTeachers.response";

@Injectable()
export class TeachersApiService{
    constructor (private http: HttpClient){}
    
    getTeachers(request: IGetTeachersRequest) : Observable<IApiResponseWithData<IGetTeachersResponse>> {
        let httpParams = new HttpParams();
        if (request?.filter?.name){
            httpParams = httpParams.append('name', request.filter.name)
        }
        if (request?.filter?.surname){
            httpParams = httpParams.append('surname', request.filter.surname)
        }
        httpParams = httpParams.append('limit', request.limit)
        httpParams = httpParams.append('offset', request.offset)
        
        return this.http.get<IApiResponseWithData<IGetTeachersResponse>>(`${environment.apiUrl}/teachers/all`, {
            params: httpParams
        });
    }

    getTests(request: IGetTeacherTestsRequest): Observable<IApiResponseWithData<IGetTeacherTestsResponse>> {
        let params = new HttpParams();
        params = params.append('offset', request.offset);
        params = params.append('limit', request.limit);

        return this.http.get<IApiResponseWithData<IGetTeacherTestsResponse>>(`${environment.apiUrl}/teachers/tests`, {
            params
        })
    }
}