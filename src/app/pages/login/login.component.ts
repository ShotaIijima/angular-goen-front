import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { conf } from '../../conf';
import { msgs } from '../../msgs';
import { MasterService } from '../../shared/services/master.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { delAuthLocalStorage } from '../../shared/utils/localStorageUtils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mail_address: string;
  password: string;
  masterFetched: boolean = false;
  serverErrMsg: string = null;
  errRedirectMsg: string = null;
  signin_url: string = 'signin';
  loading: boolean = this.spinner.getLoading();

  constructor(
    private auth: AuthService,
    private master: MasterService,
    public spinner: SpinnerService,
    private router: Router
    ) { }

  ngOnInit() {
    delAuthLocalStorage();
    if(sessionStorage.getItem("errRedirect") === "1"){
      this.errRedirectMsg = msgs.ERR_MSG_SESS_TIMEOUT;
      sessionStorage.removeItem("errRedirect");
    }
    if(this.router.url.indexOf("mng") !== -1) {
      localStorage.setItem(conf["SKEY_IS_MNG"], "1");
      this.signin_url = 'mng/signin';
    } else {
      localStorage.setItem(conf["SKEY_IS_MNG"], "0");
    }
    localStorage.removeItem(conf["SKEY_ISFBLOGIN"]);
    var err_msg = localStorage.getItem(conf["SKEY_REDIR_BY_SERVER_ERR"]);
    if (err_msg != null) {
      this.serverErrMsg = err_msg;
      localStorage.removeItem(conf["SKEY_REDIR_BY_SERVER_ERR"]);
    }
    this.master.fetchMaster()
    .then((res) => {
      this.masterFetched = res;
    })
    .catch((err) => {
      this.serverErrMsg = msgs.ERR_MSG_F5_REQUEST;
    })
  }

  login() {
    if(!this.masterFetched)
      return;
    this.disableNotifications();
    this.auth.login(this.mail_address, this.password)
    .catch(err => {
      console.log(err);
      if (err === 403 || err === 404) {
        this.serverErrMsg = msgs.ERR_MSG_CANTLOGIN;
      } else {
        this.serverErrMsg = msgs.ERR_MSG_SERVER_ERR;
      }
    })
  }

  fbLogin() {
    this.disableNotifications();
    localStorage.setItem(conf["SKEY_ISFBLOGIN"], '1');
    window.location.href = conf["SERVER_URL"] + '/api/auth/facebook';
  }

  disableNotifications() {
    this.serverErrMsg = null;
  }
}
