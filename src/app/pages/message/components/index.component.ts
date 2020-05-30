import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'message-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class MessageIndexComponent implements OnInit {
  user: User;

  constructor(
    private _user: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this._user.getUser();
  }

  goChatPage(user_id) {
    console.log(user_id)
    this.router.navigate(['/pages/message/chat']);
  }

  showMessage(user_id) {
    return;
  }

  goChat(user_id) {
    alert("hello")
  }
}
