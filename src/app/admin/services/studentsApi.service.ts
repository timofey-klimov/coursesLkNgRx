import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponseWithData } from "src/app/shared/types/api-response/apiResponse.interface";
import { IStudent } from "src/app/shared/types/student.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class StudentsApiService{
    constructor (private http: HttpClient){}

    getAllStudents() : Observable<IApiResponseWithData<IStudent[]>>{
        return this.http.get<IApiResponseWithData<IStudent[]>>(`${environment.apiUrl}/students/all`)
    }
}