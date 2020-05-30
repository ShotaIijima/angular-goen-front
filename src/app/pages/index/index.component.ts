import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts/components/echarts/charts.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { conf } from '../../conf';
import { MasterService } from '../../shared/services/master.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';
import { User } from '../../shared/models/User';
import { RelationService } from '../../shared/services/relation.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [ChartsService]
})
export class IndexComponent implements OnInit {
  showloading: boolean = false;
  master = null;
  //user: User;

  public AnimationBarOption;

  constructor(
    private _chartsService: ChartsService,
    private http: HttpClient,
    private _auth: AuthService,
    private _rel: RelationService,
    //private _user: UserService,
    private _master: MasterService,
    private router: Router,
    private _globalService: GlobalService
  ) { }

  ngOnInit() {
    if(this._rel.getRelations() == null)
      this._rel.fetchRelations();
    if(localStorage.getItem(conf["SKEY_ISFBSIGNIN"]) === '1' ||
       localStorage.getItem(conf["SKEY_ISFBLOGIN"]) === '1') {
      if(localStorage.getItem(conf["SKEY_FBUSERSETTED"]) === '1')
        return;
      this._auth.getFBUser();
      const reload_done = localStorage.getItem(conf["SKEY_RELOAD_DONE"]);
      if (reload_done == null) {
        location.reload();
        localStorage.setItem(conf["SKEY_RELOAD_DONE"], '1');
      }
    }
    this.master = this._master.getMaster();
    //this.user = this._user.getUser();
    console.log(this.master);
  }

  showMatchedUser() {
    this._globalService.dataBusChanged('isActived', {
      path: 'group',
      title: 'Matching User',
      icon: 'group'
    });
    this.router.navigate(['/pages/group']);
  }

  showMessages() {
    this._globalService.dataBusChanged('isActived', {
      path: 'message',
      title: 'Message',
      icon: 'comments'
    });
    this.router.navigate(['/pages/message']);
  }
}
