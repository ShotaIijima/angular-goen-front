import { Component, OnInit } from '@angular/core';
import { conf } from '../../conf';
import { msgs } from '../../msgs';
import { AuthService } from '../../shared/services/auth.service';
import { MasterService } from '../../shared/services/master.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { Router } from '@angular/router';
import { delAuthLocalStorage } from '../../shared/utils/localStorageUtils';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  mail_address: string;
  password: string;
  account: string;
  masterFetched: boolean = false;
  serverErrMsg: string = null;
  loading: boolean = this.spinner.getLoading();

  constructor(
    private auth: AuthService,
    private master: MasterService,
    public spinner: SpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    delAuthLocalStorage();
    if(this.router.url.indexOf("mng") !== -1) {
      localStorage.setItem(conf["SKEY_IS_MNG"], "1");
    } else {
      localStorage.setItem(conf["SKEY_IS_MNG"], "0");
    }
    this.master.fetchMaster()
    .then((res) => {
      this.masterFetched = res;
    })
    .catch((err) => {
      this.serverErrMsg = msgs.ERR_MSG_SERVER_ERR;
    })
  }

  signin() {
    this.disableNotifications();
    this.auth.signin(this.account, this.mail_address, this.password, localStorage.getItem(conf["SKEY_IS_MNG"]))
    .catch(err => {
      console.log(err);
      if (err === "exists") {
        this.serverErrMsg = msgs.ERR_MSG_NAME_ALREADY_USE;
      } else {
        this.serverErrMsg = msgs.ERR_MSG_SERVER_ERR;
      }
    })
  }

  fbSignin() {
    this.disableNotifications();
    localStorage.setItem(conf["SKEY_ISFBSIGNIN"], '1');
    window.location.href = conf["SERVER_URL"] + '/api/auth/facebook';
  }

  disableNotifications() {
    this.serverErrMsg = null;
  }
}
