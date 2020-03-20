import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

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
    if (this.auth.isLoginedByDB()) {
        return true;
    } else {
        if (this.auth.isLoginedByFB()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
  }
}