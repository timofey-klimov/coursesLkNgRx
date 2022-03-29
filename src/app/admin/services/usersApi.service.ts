import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponse, IApiResponseWithData } from "src/app/shared/types/api-response/apiResponse.interface";
import { environment } from "src/environments/environment";
import { ICreateParticipant } from "../types/createParticipant.request";
import { IGetUsersRequest } from "../types/getUsers.request";
import { IGetUsersResponse } from "../types/getUsers.response";
import { IParticipant } from "../../shared/types/participant.interface";

@Injectable()
export class UsersApiService {

    constructor(private http: HttpClient) {

    }

    getUsers(request: IGetUsersRequest): Observable<IApiResponseWithData<IGetUsersResponse>> {

        let httpParams = new HttpParams();
        httpParams = httpParams.append('offset', String(request.offset));
        httpParams = httpParams.append('limit', String(request.limit));
        if(request.filter?.login){
            httpParams = httpParams.append('login', request.filter.login)
        }

        if(request.filter.name) {
            httpParams = httpParams.append('name', request.filter.name)
        }

        if (request.filter.surname) {
            httpParams = httpParams.append('surname', request.filter.surname)
        }

        if (request.filter.isOnlyActive) {
            httpParams = httpParams.append('isOnlyActive', String(request.filter.isOnlyActive))
        }

        return this.http.get<IApiResponseWithData<IGetUsersResponse>>(`${environment.apiUrl}/participants/all`, {
            params: httpParams
        });
    }

    createUser(request: ICreateParticipant): Observable<IApiResponseWithData<IParticipant>> {
        return this.http.post<IApiResponseWithData<IParticipant>>(`${environment.apiUrl}/participants/sign-up`, request);
    }

    blockUser(id: number): Observable<IApiResponseWithData<number>> {
        return this.http.post<IApiResponseWithData<number>>(`${environment.apiUrl}/participants/block/${id}`, null);
    }

    unblockUser(id: number): Observable<IApiResponseWithData<number>> {
        return this.http.post<IApiResponseWithData<number>>(`${environment.apiUrl}/participants/unblock/${id}`, null)
    }
}