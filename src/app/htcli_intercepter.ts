import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { conf } from './conf';
import { msgs } from './msgs';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { delAllLocalStorage } from './shared/utils/delAllLocalStorage';
import { SpinnerService } from './shared/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class HtCliInterceptor implements HttpInterceptor {
  private baseUrl = conf["SERVER_URL"] + '/api';

  constructor(
    private router: Router,
    private spinner: SpinnerService
  ){}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _auth = localStorage.getItem(conf["SKEY_USER"]);
    var header = null;
    if(request.url.indexOf("photo/save") !== -1) {
        header = {
          'x-access-token': _auth != undefined ? JSON.parse(_auth)['res']['token'] : ''
        }
    } else {
        header = {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'x-access-token': _auth != undefined ? JSON.parse(_auth)['res']['token'] : ''
        }
    }
    const req = request.clone({
      url: `${this.baseUrl}${request.url}`,
      setHeaders: header
    });
    this.spinner.show();
    return next.handle(req).pipe(
      tap((resp) => {
        if (resp["message"] != null && resp["message"] === "cant auth token") {
          delAllLocalStorage();
          localStorage.setItem(conf["SKEY_REDIR_BY_SERVER_ERR"], msgs.ERR_MSG_SESS_TIMEOUT);
          if(localStorage.getItem(conf["SKEY_IS_MNG"]) === "0") {
            this.router.navigate(['login']);
          } else {
            this.router.navigate(['mng/login']);
          }
        }
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
