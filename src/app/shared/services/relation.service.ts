import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { conf } from '../../conf';

@Injectable()
export class RelationService {
    private relations;
    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) {}

    getRelations() {
        if(this.relations != null) {
            return this.relations;
        }
        if(JSON.parse(localStorage.getItem(conf["SKEY_RELS"])) != null) {
            this.relations = JSON.parse(localStorage.getItem(conf["SKEY_RELS"]));
            return this.relations;
        }
        return null;
    }

    searchUser(searchRank, searchStatus, searchAny) {
        for(var i=0; i<this.relations.length; i++) {
            if((searchRank == null || searchRank == '' || this.relations[i].grade === searchRank) &&
               (searchStatus == null || searchStatus == '' || this.relations[i].rel_type === searchStatus) &&
               (searchAny == null || searchAny === '' || (this.relations[i].memo != null && this.relations[i].memo.indexOf(searchAny) !== -1 ))) {
                this.relations[i].searched = true;
            } else {
                this.relations[i].searched = false;
            }
        }
    }

    updateRelations(user_id) {
        for(var i=0; i<this.relations.length; i++) {
            if(this.relations[i].id === user_id) {
                return this.http.post('/relations', this.relations[i]).toPromise()
                .then((res) => {
                    if(res["code"] !== 200)
                        return Promise.reject(res["err"]);
                    localStorage.setItem(conf["SKEY_RELS"], JSON.stringify(this.relations));
                    return Promise.resolve(true);
                })
                .catch((err) => {
                    console.log(err);
                    this.auth.errRedirect();
                    return Promise.reject(false);
                })
            }
        }
    }

    fetchRelations() {
        return this.http.get('/relations').toPromise()
        .then((res) => {
            if(res["code"] !== 200)
                return Promise.reject(res["err"]);
            for(var i=0; i<res["res"].length; i++) {
                res["res"][i].searched = true;
            }
            this.relations = res["res"];
            localStorage.setItem(conf["SKEY_RELS"], JSON.stringify(res["res"]));
            return Promise.resolve(true);
        })
        .catch((err) => {
            console.log(err);
            this.auth.errRedirect();
            return Promise.reject(false);
        })
    }

    updateRelType(user_id, rel_type) {
        for(var i=0; i<this.relations.length; i++) {
            if(this.relations[i].id === user_id) {
                this.relations[i].rel_type = rel_type
                return this.http.post('/relations', this.relations[i]).toPromise()
                .then((res) => {
                    if(res["code"] !== 200)
                        return Promise.reject(res["err"]);
                    localStorage.setItem(conf["SKEY_RELS"], JSON.stringify(this.relations));
                    return Promise.resolve(true);
                })
                .catch((err) => {
                    console.log(err);
                    this.auth.errRedirect();
                    return Promise.reject(false);
                })
            }
        }
    }
}
