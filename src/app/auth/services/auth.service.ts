import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponse, IApiResponseWithData } from "src/app/shared/types/api-response/apiResponse.interface";
import { ICurrentUser } from "src/app/shared/types/currentUser.interface";
import { environment } from "src/environments/environment";
import { ILoginRequest } from "../types/loginRequest.interface";
import { ILoginResponse } from "../types/loginResponse.interface";

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
        
    }

    login(request: ILoginRequest): Observable<IApiResponseWithData<ILoginResponse>> {
        return this.http.post<IApiResponseWithData<ILoginResponse>>(`${environment.apiUrl}/participants/sign-in`, request);
    }

    activate(password: string): Observable<IApiResponse> {
        return this.http.post<IApiResponse>(`${environment.apiUrl}/participants/activate`,{password});
    }

    getUser(): Observable<IApiResponseWithData<ICurrentUser>> {
        return this.http.get<IApiResponseWithData<ICurrentUser>>(`${environment.apiUrl}/participants/info`);
    }
}