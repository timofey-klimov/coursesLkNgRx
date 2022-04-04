import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponseWithData } from "src/app/shared/types/api-response/apiResponse.interface";
import { ITeacher } from "src/app/shared/types/teacher.interface";
import { environment } from "src/environments/environment";
import { IGetTeachersRequest } from "../types/getTeachers.request";
import { IGetTeachersResponse } from "../types/getTeachers.response";

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
}