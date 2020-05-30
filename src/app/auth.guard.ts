import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { conf } from './conf';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private logined = false;

  constructor(
    private router: Router,
    private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //return true;
    if (this.auth.isLoginedByDB()) {
      return true;
    } else {
        if (this.auth.isLoginedByFB()) {
          return true;
        } else {
          if(localStorage.getItem(conf["SKEY_IS_MNG"]) === "0") {
            this.router.navigate(['login']);
          } else {
            this.router.navigate(['mng/login']);
          }
          return false;
        }
    }
  }
}