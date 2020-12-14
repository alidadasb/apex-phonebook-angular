
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as data from './data.json';

const urls = [
    {
        url: "http://localhost:8080/api/contact/",
        method: 'GET',
        getData: (request)=> data.data
    }
    ,{
        url: "http://localhost:8080/api/contact/",
        method: 'POST',
        getData: (request)=> request.body
    }
];

@Injectable()
// @ts-ignore
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const element of urls) {
    if (request.url === element.url && request.method == element.method) {
        console.log('Loaded from json : ' + request.url);
        return of(new HttpResponse({ status: 200, body: element.getData(request) }));
    }
}
console.log('Loaded from http call :' + request.url);
return next.handle(request);
}
}
