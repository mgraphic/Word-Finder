import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { HttpInterceptorService } from './http-interceptor.interceptor';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../environment';

describe('HttpInterceptorService', () => {
    let httpInterceptor: HttpInterceptorService;
    let httpMock: HttpTestingController;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpInterceptorService],
        });

        httpInterceptor = TestBed.inject(HttpInterceptorService);
        httpMock = TestBed.inject(HttpTestingController);
        http = TestBed.inject(HttpClient);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should add X-Access-Token header to requests with /ws-api/ URL', () => {
        const req = new HttpRequest('GET', '/ws-api/example');
        const mockResponse = { data: 'example response' };

        http.request(req).subscribe();

        const interceptedRequest = httpMock.expectOne('/ws-api/example');
        expect(interceptedRequest.request.headers.get('X-Access-Token')).toBe(
            environment.accessToken
        );
        interceptedRequest.flush(mockResponse);
    });

    it('should not add X-Access-Token header to requests without /ws-api/ URL', () => {
        const req = new HttpRequest('GET', '/example');
        const mockResponse = { data: 'example response' };

        http.request(req).subscribe();

        const interceptedRequest = httpMock.expectOne('/example');
        expect(
            interceptedRequest.request.headers.get('X-Access-Token')
        ).toBeNull();
        interceptedRequest.flush(mockResponse);
    });
});
