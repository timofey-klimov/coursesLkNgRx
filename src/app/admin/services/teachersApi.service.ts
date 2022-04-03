import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponseWithData } from "src/app/shared/types/api-response/apiResponse.interface";
import { ITeacher } from "src/app/shared/types/teacher.interface";
import { environment } from "src/environments/environment";
import { IGetTeachersRequest } from "../types/getTeachers.request";

@Injectable()
export class TeachersApiService{
    constructor (private http: HttpClient){}
    
    getTeachers(request: IGetTeachersRequest) : Observable<IApiResponseWithData<ITeacher[]>> {
        let httpParams = new HttpParams();
        if (request?.name){
            httpParams = httpParams.append('name', request.name)
        }
        if (request?.surname){
            httpParams = httpParams.append('surname', request.surname)
        }
        
        return this.http.get<IApiResponseWithData<ITeacher[]>>(`${environment.apiUrl}/teachers/all`, {
            params: httpParams
        });
    }
}