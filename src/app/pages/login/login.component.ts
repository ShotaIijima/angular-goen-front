import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { conf } from '../../conf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mail_address: string;
  password: string;
  cannotLogin: boolean = false;
  serverErr: boolean = false;
  masterFetched: boolean = false;

  constructor(
    private auth: AuthService
    ) { }

  ngOnInit() {
    localStorage.removeItem(conf.SKEY_ISFBLOGIN);
  }

  login() {
    this.disableNotifications();
    this.auth.login(this.mail_address, this.password)
    .catch(err => {
      console.log(err);
      if (err === 403) {
        this.cannotLogin = true;
      } else {
        this.serverErr = true;
      }
    })
  }

  fbLogin() {
    this.disableNotifications();
    localStorage.setItem(conf.SKEY_ISFBLOGIN, '1');
    window.location.href = 'http://localhost:3000/api/auth/facebook';
  }

  disableNotifications() {
    this.serverErr = false;
    this.cannotLogin = false;
  }
}
