import { Injectable } from '@angular/core';
import { conf } from '../../conf';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { sleep } from '../utils/sleep';
import { AuthService } from './auth.service';

@Injectable()
export class MasterService {
    private master;
    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) {}

    getMaster() {
        if(this.master != null) {
            return this.master;
        }
        if(JSON.parse(localStorage.getItem(conf["SKEY_MASTER"])) != null) {
            this.master = JSON.parse(localStorage.getItem(conf["SKEY_MASTER"]));
            return this.master;
        }
        return null;
    }

    getTypeDetails() {
        if(JSON.parse(localStorage.getItem(conf["SKEY_TD"])) != null) {
            return JSON.parse(localStorage.getItem(conf["SKEY_TD"]));
        }
        return null;
    }

    fetchTypeDetails(type) {
        return this.http.post('/typedetails', {type}).toPromise()
        .then((res) => {
            if(res["code"] !== 200)
                return Promise.reject(res["err"]);
            localStorage.setItem(conf["SKEY_TD"], JSON.stringify(res["res"]));
            return Promise.resolve(true);
        })
        .catch((err) => {
            console.log(err);
            this.auth.errRedirect();
            return Promise.reject(false);
        })
    }

    fetchMaster() {
        return this.http.get('/master/all').toPromise()
        .then((res) => {
            if(res["code"] !== 200)
                return Promise.reject(res["err"]);
            this.master = res["res"];
            localStorage.setItem(conf["SKEY_MASTER"], JSON.stringify(this.master));
            return Promise.resolve(true);
        })
        .catch((err) => {
            console.log(err);
            this.auth.errRedirect();
            return Promise.reject(false);
        })
    }
}