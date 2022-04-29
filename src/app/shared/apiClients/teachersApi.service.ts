import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponseWithData } from "src/app/shared/types/api-response/apiResponse.interface";
import { IGetGroupInfoRequest } from "src/app/teacher/teacher-groups/types/getGroupInfo.request";
import { IGetGroupInfoResponse } from "src/app/teacher/teacher-groups/types/getGroupInfo.response";
import { IGetGroupsRequest } from "src/app/teacher/teacher-groups/types/getGroups.request";
import { IGetGroupsResponse } from "src/app/teacher/teacher-groups/types/getGroups.response";
import { IGetManagedStudentsRequest } from "src/app/teacher/types/getManagedStudents.request";
import { IGetManagedStudentsResponse } from "src/app/teacher/types/getManagedStudents.response";
import { IGetStudentInfoRequest } from "src/app/teacher/types/getStudentInfo.request";
import { IGetStudentInfoResponse } from "src/app/teacher/types/getStudentInfo.response";
import { IGetTeacherTestsRequest } from "src/app/teacher/teacher-tests/types/getTests.request";
import { IGetTeacherTestsResponse } from "src/app/teacher/teacher-tests/types/getTests.response";
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

    getGroups(request: IGetGroupsRequest): Observable<IApiResponseWithData<IGetGroupsResponse>> {
        let params = new HttpParams();
        params = params.append('offset', request.offset);
        params = params.append('limit', request.limit);
        
        return this.http.get<IApiResponseWithData<IGetGroupsResponse>>(`${environment.apiUrl}/teachers/groups`, {
            params
        })
    }

    getGroupInfo(request: IGetGroupInfoRequest): Observable<IApiResponseWithData<IGetGroupInfoResponse>> {
        return this.http.get<IApiResponseWithData<IGetGroupInfoResponse>>(`${environment.apiUrl}/teachers/groups/info/${request.groupId}`)
    }

    getManagedStudents(request: IGetManagedStudentsRequest): Observable<IApiResponseWithData<IGetManagedStudentsResponse>> {

        let params = new HttpParams();
        params = params.append('limit', request.limit);
        params = params.append('offset', request.offset);

        return this.http.get<IApiResponseWithData<IGetManagedStudentsResponse>>(`${environment.apiUrl}/teachers/students/all`, {
            params
        })
    }

    getStudentInfo(request: IGetStudentInfoRequest): Observable<IApiResponseWithData<IGetStudentInfoResponse>> {
        return this.http.get<IApiResponseWithData<IGetStudentInfoResponse>>(`${environment.apiUrl}/teachers/students/${request.studentId}/info`);
    }
}