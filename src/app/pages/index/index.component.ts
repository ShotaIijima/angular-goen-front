import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts/components/echarts/charts.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { conf } from '../../conf';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [ChartsService]
})
export class IndexComponent implements OnInit {
  showloading: boolean = false;
  username: string = '';

  public AnimationBarOption;

  constructor(
    private _chartsService: ChartsService,
    private http: HttpClient,
    private _auth: AuthService,
    private _user: UserService
  ) { }

  ngOnInit() {
    if(localStorage.getItem(conf.SKEY_ISFBSIGNIN) === '1' ||
       localStorage.getItem(conf.SKEY_ISFBLOGIN) === '1') {
      if(localStorage.getItem(conf.SKEY_FBUSERSETTED) === '1')
        return;
      this._auth.getFBUser();
      const reload_done = localStorage.getItem(conf.SKEY_RELOAD_DONE);
      if (reload_done == null) {
        location.reload();
        localStorage.setItem(conf.SKEY_RELOAD_DONE, '1');
      }
    }
  }

  showMatchedUser() {
    this._user.getUser()
  }
}
