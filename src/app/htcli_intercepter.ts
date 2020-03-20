import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { conf } from './conf';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HtCliInterceptor implements HttpInterceptor {
  private baseUrl = 'http://localhost:3000/api';

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _auth = localStorage.getItem(conf.SKEY_USER);
    const req = request.clone({
      url: `${this.baseUrl}${request.url}`,
      setHeaders: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'x-access-token': _auth != undefined ? JSON.parse(_auth)['res']['token'] : ''
      }
    });
    return next.handle(req);
  }
}
