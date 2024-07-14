import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        let newRequest = request;

        if (environment.accessToken && request.url.includes('/ws-api/')) {
            newRequest = request.clone({
                headers: request.headers.set(
                    'X-Access-Token',
                    environment.accessToken
                ),
            });
        }

        return next.handle(newRequest);
    }
}
