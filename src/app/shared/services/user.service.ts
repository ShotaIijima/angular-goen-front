import { Injectable } from '@angular/core';
import { conf } from '../../conf';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { sleep } from '../utils/sleep';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { fixDateFormat } from '../utils/fixDateFormat';

@Injectable()
export class UserService {
    private user: User;
    constructor(
        private http: HttpClient,
        private router: Router,
        private auth: AuthService
    ) {}

    getUser() {
        if(this.user == null) {
            if(JSON.parse(localStorage.getItem(conf["SKEY_USER"])) == null) {
              var user_getted = false;
              for(var i = 0; i < 8; i++) {
                if (user_getted)
                    break;
                sleep(1, () => {
                  // 1秒待ってリトライ
                  if(JSON.parse(localStorage.getItem(conf["SKEY_USER"])) == null)
                      user_getted = true;
                });
              }
            }
            var _user = JSON.parse(localStorage.getItem(conf["SKEY_USER"]))['res']['user'];
            // facebook認証ユーザだけ、'user'が入れ子になってしまったので、その対策
            if(_user["user"] != null)
                this.user = _user['user'];
            else
                this.user = _user;
            this.user.isMng = this.isMng();
        }
        return this.user;
    }

    delUser() {
        this.user = null;
    }

    isMng() {
        return this.user.auth_type === 3 ||
               this.user.auth_type === 4;
    }

    updateUser(user) {
        return this.http.post('/user', user).toPromise()
        .then((res) => {
            console.log(res);
            if(res["code"] !== 200)
                return Promise.reject(res["err"]);
            this.user = user;
            this.user.updated_at = fixDateFormat(res["updated_at"][0]["updated_at"]);
            var _user = JSON.parse(localStorage.getItem(conf["SKEY_USER"]));
            if(_user['res']['user']['user'] != null)
                _user['res']['user']['user'] = this.user;
            else
                _user['res']['user'] = this.user;
            localStorage.setItem(conf["SKEY_USER"], JSON.stringify(_user));
            return Promise.resolve("OK");
        })
        .catch((err) => {
            console.log(err);
            this.auth.errRedirect();
            return Promise.reject("server err");
        })
    }

    updatePhotoPath(data: FormData) {
        return this.http.post('/photo/save', data).toPromise()
        .then((res) => {
            console.log(res);
            if(res["code"] !== 200)
                return Promise.reject(res["err"]);
            this.user.photo_path  = res["photo_path"];
            var _user = JSON.parse(localStorage.getItem(conf["SKEY_USER"]));
            if(_user['res']['user']['user'] != null)
                _user['res']['user']['user']["photo_path"] = this.user.photo_path;
            else
                _user['res']['user']["photo_path"] = this.user.photo_path;
            localStorage.setItem(conf["SKEY_USER"], JSON.stringify(_user));
            return Promise.resolve("OK");
        })
        .catch((err) => {
            console.log(err);
            this.auth.errRedirect();
            return Promise.reject("server err");
        })
    }
}
