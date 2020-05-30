import {AfterViewInit, Component, Input} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss'],
})
export class PagesTopComponent implements AfterViewInit {
  avatarImgSrc: string = 'assets/images/avatarAAA.jpg';
  user: User;

  sidebarToggle: boolean = true;
  tip = {email: true};

  constructor(
    private _auth: AuthService,
    private _user: UserService,
    private _globalService: GlobalService,
    private _router: Router) {
  }

  ngOnInit() { 
    this.user = this._user.getUser();
  }

  public _sidebarToggle() {
    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });
    this._globalService.dataBusChanged('sidebarToggle', !this.sidebarToggle);
    //this._globalService._sidebarToggleState(!this.sidebarToggle);
  }

  public _logout() {
    this._user.delUser();
    this._auth.logout();
  }

  ngAfterViewInit(): void {
    this.sidebarToggle = window.innerWidth >= 970;
  }

  goHomePage() {
    this._router.navigate(['/pages/index']);
  }
}
