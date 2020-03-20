import { Component, OnInit } from '@angular/core';
import { sleep } from '../../shared/utils/sleep';
import { conf } from '../../conf';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  mail_address: string;
  password: string;
  account: string;
  isAlreadyUsed: boolean = false;
  serverErr: boolean = false;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    localStorage.removeItem(conf.SKEY_ISFBLOGIN);
  }

  signin() {
    this.disableNotifications();
    this.auth.signin(this.account, this.mail_address, this.password)
    .catch(err => {
      console.log(err);
      if (err === "exists") {
        this.isAlreadyUsed = true;
      } else {
        this.serverErr = true;
      }
    })
  }

  fbSignin() {
    this.disableNotifications();
    localStorage.setItem(conf.SKEY_ISFBSIGNIN, '1');
    window.location.href = 'http://localhost:3000/api/auth/facebook';
  }

  disableNotifications() {
    this.serverErr = false;
    this.isAlreadyUsed = false;
  }
}
