import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }

        return next.handle(req)
            .pipe(
                map(event => {
                    if (event instanceof HttpResponse && event.body.code === 0){
                        console.log(event);
                    }
    
                    if (event instanceof HttpResponse && event.body.code !== 0){
                        console.error(event);
    
    
                        throw new HttpErrorResponse({
                            error: event.body.ErrorMessage,
                            headers: event.headers,
                            status: event.body.Code,
                            url: event.url
                        })
                    }
    
                    return event;
                })
            )
    }
    
}