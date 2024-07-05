import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        let newRequest = request;

        if (request.url.includes('/ws-api/')) {
            newRequest = request.clone({
                headers: request.headers.set('X-Access-Token', 'abc'),
            });
        }

        return next.handle(newRequest);
    }
}
