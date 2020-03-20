import { Injectable } from '@angular/core';
import { conf } from '../../conf';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { sleep } from '../utils/sleep';

@Injectable()
export class UserService {
    private user: User;
    constructor(
        private http: HttpClient,
    ) {}

    getUser() {
        if(this.user == null) {
            if(JSON.parse(localStorage.getItem(conf.SKEY_USER)) == null) {
              var user_getted = false;
              for(var i = 0; i < 8; i++) {
                if (user_getted)
                    break;
                sleep(1, () => {
                  // 1秒待ってリトライ
                  if(JSON.parse(localStorage.getItem(conf.SKEY_USER)) == null)
                      user_getted = true;
                });
              }
            }
            var _user = JSON.parse(localStorage.getItem(conf.SKEY_USER))['res']['user'];
            // facebook認証ユーザだけ、'user'が入れ子になってしまったので、その対策
            if(_user["user"] != null)
                this.user = _user['user'];
            else
                this.user = _user;
        }
        return this.user;
    }

    delUser() {
        this.user = null;
    }

    updateUser(user) {
        return this.http.post('/user', user).toPromise()
        .then((res) => {
            if(res["code"] !== 200)
                return Promise.reject(res["err"]);
            this.user = user;
            var _user = JSON.parse(localStorage.getItem(conf.SKEY_USER));
            if(_user['res']['user']['user'] != null)
                _user['res']['user']['user'] = this.user;
            else
                _user['res']['user'] = this.user;
            localStorage.setItem(conf.SKEY_USER, JSON.stringify(_user));
            return Promise.resolve("OK");
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject("server err");
        })
    }
}