import { Injectable } from '@angular/core';
import { conf } from '../../conf';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { sleep } from '../utils/sleep';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { fixDateFormat } from '../utils/fixDateFormat';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore/public_api';
import { _Comment } from '../models/Comment';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
    private comCollection: AngularFirestoreCollection;
    private coms: any;

    constructor(
        private db: AngularFirestore,
    ) {
        this.comCollection = db.collection<_Comment>('comments')
        this.coms = this.comCollection.snapshotChanges()
    }

    public getComs() {
        return this.coms
    }

    public deleteCom(com: _Comment) {
        this.comCollection.doc(com.id).delete()
    }

    public addCom(com: _Comment) {
        const id = this.db.createId();
        com.id = id
        this.comCollection.doc(id).set(com);
    }
}
