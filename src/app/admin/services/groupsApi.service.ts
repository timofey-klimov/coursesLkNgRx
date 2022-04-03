import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponseWithData } from "src/app/shared/types/api-response/apiResponse.interface";
import { environment } from "src/environments/environment";
import { IGetGroupsRequest } from "../types/getGroups.request";
import { IGetGroupsResponse } from "../types/getGroups.response";

@Injectable()
export class GroupsApiService {

    constructor(private httpClient: HttpClient) {

    }

    getGroups(request: IGetGroupsRequest): Observable<IApiResponseWithData<IGetGroupsResponse>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('limit', request.limit)
        httpParams = httpParams.append('offset', request.offset)
        return this.httpClient.get<IApiResponseWithData<IGetGroupsResponse>>(`${environment.apiUrl}/studyGroups/all`, {
            params: httpParams
        })
    }
}