export interface IApiResponse {
    code: number;
    errorMessage: string,
    isSuccess: boolean
}

export interface IApiResponseWithData<T> extends IApiResponse{
    data:T;
}