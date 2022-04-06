import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponseWithData } from "src/app/shared/types/api-response/apiResponse.interface";
import { IGroup } from "src/app/shared/types/group.interface";
import { environment } from "src/environments/environment";
import { ICreateGroupRequest } from "../../admin/types/createGroup.request";
import { IGetGroupsRequest } from "../../admin/types/getGroups.request";
import { IGetGroupsResponse } from "../../admin/types/getGroups.response";
import { IGetStudyGroupInfoRequest } from "../../admin/types/getStudyGroupInfo.request";
import { IGetStudyGroupInfoResponse } from "../../admin/types/getStudyGroupInfo.response";

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

    createGroup(request: ICreateGroupRequest): Observable<IApiResponseWithData<IGroup>> {
        return this.httpClient.post<IApiResponseWithData<IGroup>>(`${environment.apiUrl}/studyGroups/create`, request);
    }

    getInfo(request: IGetStudyGroupInfoRequest): Observable<IApiResponseWithData<IGetStudyGroupInfoResponse>> {
        return this.httpClient.get<IApiResponseWithData<IGetStudyGroupInfoResponse>>(`${environment.apiUrl}/studyGroups/info/${request.teacherId}/${request.groupId}`)
    }
}