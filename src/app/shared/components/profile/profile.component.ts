import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { getDayCount } from '../../utils/getDayCount';
import { calculate_age } from '../../utils/calc_age';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  avatarImgSrc: string = 'assets/images/avatarAAA.jpg';
  user: User;
  years = [null];
  months = [];
  days = [];
  birthY: string;
  birthM: string;
  birthD: string;
  updateCompleted: boolean = false;
  updateFailed: boolean = false;
  
  constructor(
    private _user: UserService,
  ) { }

  ngOnInit() {
    this.user = this._user.getUser();
    for(var i=1950; i<2010; i++){
      this.years.push(i);
    }
    this.avatarImgSrc = 'assets/images/avatar.jpg';
  }

  updateUser() {
    this.updateCompleted = false;
    this.updateFailed = false;
    this._user.updateUser(this.user)
    .then((res) =>{
      console.log(res);
      if(res === "OK"){
        this.updateCompleted = true;
      }
    })
    .catch((err) => {
      console.log(err);
      this.updateFailed = true;
    })
  }

  onChangeBirthY(year) {
    this.birthY = year;
    this.months = [];
    for(var i=1; i<13; i++){
      this.months.push(i);
    }
    this.makeBirthDay();
  }

  onChangeBirthM(month) {
    this.birthM = month;
    this.days = [];
    const day_count = getDayCount(this.birthY, this.birthM);
    for(var i=1; i<day_count+1; i++){
      this.days.push(i);
    }
    this.makeBirthDay();
  }

  onChangeBirthD(day) {
    this.birthD = day;
    this.makeBirthDay();
  }

  makeBirthDay() {
    if(this.birthY != null && this.birthY != null && this.birthY != null){
      this.user.birthday = `${this.birthY}-${this.birthM}-${this.birthD}`;
      const age = calculate_age(this.user.birthday);
      console.log(age);
    }
  }
}
