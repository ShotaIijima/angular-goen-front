import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { conf } from '../../conf';
import { UserService } from './user.service';
import { delAllLocalStorage } from '../utils/delAllLocalStorage';
import { fixDateFormat } from '../utils/fixDateFormat';

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router
        ) {}

    login(mail_address:string, password:string ) {
        const redirect_to = localStorage.getItem(conf["SKEY_REDIRECT_TO"])
        return this.http.post<User>('/login/local', 
          { mail_address, password }).toPromise()
            .then(res => {
              console.log(res);
              if(res["code"] === 403){
                return Promise.reject(403);
              }
              if(res["res"]["user"]["auth_type"] > 2 && this.router.url.indexOf("mng") === -1)
                return Promise.reject(404);
              if(res["res"]["user"]["auth_type"] < 3 && this.router.url.indexOf("mng") !== -1)
                return Promise.reject(404);
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

    logout() {
        var url = "login";
        if(localStorage.getItem(conf["SKEY_IS_MNG"]) === "1") {
            url = "mng/" + url;
        }
        delAllLocalStorage();
        this.router.navigate([url]);
    }

    signin(account:string, mail_address:string, password:string, is_mng:string) {
        return this.http.post('/signin/local', 
          { account, mail_address, password, is_mng }).toPromise()
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
        authResult.expire = Date.now() + 24 * 60 * 60 * 1000;
        if(authResult["res"]["user"]["created_at"] != null) {
          authResult["res"]["user"]["created_at"] = fixDateFormat(authResult["res"]["user"]["created_at"]);
        }
        if(authResult["res"]["user"]["updated_at"] != null) {
          authResult["res"]["user"]["updated_at"] = fixDateFormat(authResult["res"]["user"]["updated_at"]);
        }
        localStorage.setItem(conf["SKEY_USER"], JSON.stringify(authResult));
        return true;
    }

    errRedirect() {
        sessionStorage.setItem("errRedirect", "1");
        this.logout();
    }

    public isLoginedByDB() {
        const _auth = JSON.parse(localStorage.getItem(conf["SKEY_USER"]));
        if (_auth && Date.now() < _auth.expire)
            return true;
        localStorage.setItem(conf["SKEY_REDIRECT_TO"], location.href);
        return false;
    }

    public isLoginedByFB() {
        return localStorage.getItem(conf["SKEY_ISFBLOGIN"]) === '1';
    }

    public getFBUser() {
        localStorage.setItem(conf["SKEY_ISFBLOGIN"], '1');
        this.http.get('/fbuser').toPromise()
        .then((res) => {
          if (res["code"] === 200) {
            this.setSession(res);
            this.getUser();
          }
        })
        .catch((err) => {
          console.log(err);
          this.errRedirect();
        })
    }

    getUser() {
        localStorage.setItem(conf["SKEY_FBUSERSETTED"], '1');
        this.http.get('/user/info').toPromise()
        .then((res) => {
          this.setUser(res['account']);
        })
        .catch((err) => {
          console.log(err);
          this.errRedirect();
        })
    }

    setUser(account) {
        var _auth = JSON.parse(localStorage.getItem(conf["SKEY_USER"]));
        _auth['res']['user'] = account;
        localStorage.setItem(conf["SKEY_USER"], JSON.stringify(_auth));
    }
}