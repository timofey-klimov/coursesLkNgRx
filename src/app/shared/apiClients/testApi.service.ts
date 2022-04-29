import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICreateTestRequest } from "src/app/teacher/teacher-tests/types/createTest.request";
import { environment } from "src/environments/environment";
import { IApiResponseWithData } from "../types/api-response/apiResponse.interface";
import { ITest } from "../types/test.interface";

@Injectable()
export class TestApiService {

    constructor(private http: HttpClient) {

    }

    createTest(request: ICreateTestRequest): Observable<IApiResponseWithData<ITest>> {
        return this.http.post<IApiResponseWithData<ITest>>(`${environment.apiUrl}/tests/create`, request);
    }
}