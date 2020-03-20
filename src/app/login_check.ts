import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {
 
  constructor(private router: Router) { }
 
  /**
   * ログイン画面へ遷移する
   */
  public goLogin(): void {
    this.router.navigate(['/login']);
  }
 
  /**
   * ログイン画面へリダイレクトする
   */
  public redirectLogin(): void {
    location.href = 'http://localhost:4200/login';
  }
 
}