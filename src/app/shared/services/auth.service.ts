import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { conf } from '../../conf';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private _user: UserService
        ) {}

    login(mail_address:string, password:string ) {
        const redirect_to = localStorage.getItem(conf.SKEY_REDIRECT_TO)

        return this.http.post<User>('/login/local', 
          { mail_address, password }).toPromise()
            .then(res => {
              console.log(res);
              if(res["code"] === 403){
                return Promise.reject(403);
              }
              this.setSession(res);
              if(redirect_to != null){
                  this.router.navigate([redirect_to]);
              } else {
                  this.router.navigate(['/pages/index']);
              }
              return Promise.resolve(res);
            })
            .catch((err) => {
              console.log(err);
              return Promise.reject(err);
            });
    }

    signin(account:string, mail_address:string, password:string) {
        return this.http.post('/signin/local', 
          { account, mail_address, password }).toPromise()
            .then(res => {
                console.log(res);
              if (res['code'] === 200) {
                this.setSession(res);
                this.router.navigate(['/pages/index']);
                return Promise.resolve("OK");
              } else {
                return Promise.reject("exists");
              }
            })
    }

    setSession(authResult) {
        authResult.expire = Date.now() + 30 * 60 * 1000
        localStorage.setItem(conf.SKEY_USER, JSON.stringify(authResult));
        return true;
    }

    logout() {
        this._user.delUser();
        localStorage.removeItem(conf.SKEY_ISFBSIGNIN);
        localStorage.removeItem(conf.SKEY_FBUSERSETTED);
        localStorage.removeItem(conf.SKEY_ISFBLOGIN);
        localStorage.removeItem(conf.SKEY_REDIRECT_TO);
        localStorage.removeItem(conf.SKEY_USER);
        localStorage.removeItem(conf.SKEY_MASTER);
        localStorage.removeItem(conf.SKEY_RELOAD_DONE);
        this.router.navigate(['login']);
    }

    public isLoginedByDB() {
        const _auth = JSON.parse(localStorage.getItem(conf.SKEY_USER));
        if (_auth && Date.now() < _auth.expire)
            return true;
        localStorage.setItem(conf.SKEY_REDIRECT_TO, location.href);
        return false;
    }

    public isLoginedByFB() {
        return localStorage.getItem(conf.SKEY_ISFBLOGIN) === '1';
    }

    public getFBUser() {
        console.log("hswyy");
        localStorage.setItem(conf.SKEY_ISFBLOGIN, '1');
        this.http.get('/fbuser').toPromise()
        .then((res) => {
          console.log(res);
          if (res["code"] === 200) {
            this.setSession(res);
            this.getUser();
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    getUser() {
        localStorage.setItem(conf.SKEY_FBUSERSETTED, '1');
        this.http.get('/user/info').toPromise()
        .then((res) => {
          console.log(res);
          this.setUser(res['account']);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    setUser(account) {
        var _auth = JSON.parse(localStorage.getItem(conf.SKEY_USER));
        _auth['res']['user'] = account;
        localStorage.setItem(conf.SKEY_USER, JSON.stringify(_auth));
    }
}