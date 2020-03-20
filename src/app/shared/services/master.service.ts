import { Injectable } from '@angular/core';
import { conf } from '../../conf';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { sleep } from '../utils/sleep';

@Injectable()
export class MasterService {
    private master;
    constructor(
        private http: HttpClient,
    ) {}

    getMaster() {
        if(this.master != null) {
            return this.master;
        }
        if(JSON.parse(localStorage.getItem(conf.SKEY_MASTER)) != null) {
            this.master = JSON.parse(localStorage.getItem(conf.SKEY_MASTER));
            return this.master;
        }
        return null;
    }

    fetchMaster() {
        return this.http.get('/master/all').toPromise()
        .then((res) => {
            if(res["code"] !== 200)
                return Promise.reject(res["err"]);
            this.master = res["res"];
            localStorage.setItem(conf.SKEY_MASTER, JSON.stringify(this.master));
            return Promise.resolve(true);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(false);
        })
    }
}