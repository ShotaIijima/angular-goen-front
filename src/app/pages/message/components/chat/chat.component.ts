import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/User';
import { UserService } from '../../../../shared/services/user.service';
import { getDayCount } from '../../../../shared/utils/getDayCount';
import { calculate_age } from '../../../../shared/utils/calc_age';
import { MasterService } from '../../../../shared/services/master.service';
import { conf } from '../../../../conf';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  avatarImgSrc: string = 'assets/images/avatarAAA.jpg';
  user: User;
  years = [];
  months = [];
  days = [];
  birthY: string;
  birthM: string;
  birthD: string;
  mng_pref: string;
  kibousha: string;
  updateCompleted: boolean = false;
  updateFailed: boolean = false;
  updatedPhotoPathSuccess: boolean = false;
  updatedPhotoPathError: boolean = false;
  master = null;
  tds: any[] = [];
  
  constructor(
    private _user: UserService,
    private _master: MasterService
  ) { }

  ngOnInit() {
    this.user = this._user.getUser();
    if(this.user.isMng){
      this.mng_pref = "採用"
      this.kibousha = "期待日本語スキル(日本語能力検定)"
    } else {
      this.kibousha = "日本語能力検定"
    }
    this.onChangeType(this.user.type);
    this.master = this._master.getMaster();
    for(var i=1950; i<2010; i++){
      this.years.push(i);
    }
    const tmp_birth = this.user.birthday.split('-');
    this.onChangeBirthY(tmp_birth[0]);
    this.onChangeBirthM(tmp_birth[1]);
    this.onChangeBirthD(tmp_birth[2]);
    if (localStorage.getItem(conf["SKEY_ISFBSIGNIN"]) === "1" &&
        localStorage.getItem(conf["SKEY_IS_MNG"])) {
          this.user.auth_type = 4;
          this.updateUser(false);
    }
  }

  updateUser(notify: boolean = true) {
    this.updateCompleted = false;
    this.updateFailed = false;
    this._user.updateUser(this.user)
    .then((res) =>{
      console.log(res);
      if(res === "OK" && notify){
        this.updateCompleted = true;
      }
    })
    .catch((err) => {
      console.log(err);
      if(notify){
        this.updateFailed = true;
      }
    })
  }

  onChangeBirthY(year) {
    this.birthY = year;
    this.months = [null];
    for(var i=1; i<13; i++){
      this.months.push(i);
    }
    this.makeBirthDay();
  }

  onChangeBirthM(month) {
    this.birthM = month;
    this.days = [null];
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

  onChangeType(type) {
    this._master.fetchTypeDetails(type)
    .then((res) => {
      if(res){
        this.tds = this._master.getTypeDetails()
      } else {
        this.tds = null
      }
      console.log(this.tds)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  makeBirthDay() {
    if(this.birthY != null && this.birthY != null && this.birthY != null){
      this.user.birthday = `${this.birthY}-${this.birthM}-${this.birthD}`;
      const age = calculate_age(this.user.birthday);
      console.log(age);
    }
  }

  uploadProfilePhoto(evt) {
    this.updatedPhotoPathSuccess = false;
    this.updatedPhotoPathError = false;
    let f = evt.target.files[0];
    let data = new FormData();
    data.append('upfile', f, f.name);
    this._user.updatePhotoPath(data)
    .then((res) => {
      if(res === "OK"){
        this.updatedPhotoPathSuccess = true;
      }
    })
    .catch((err) => {
      console.log(err);
      this.updatedPhotoPathError = true;
    })
  }

  onChange(id, isChecked) {
    if(isChecked) {
      if(this.user.tdusers.indexOf(id) === -1) {
        this.user.tdusers.push(id);
      }
    } else {
      const idx = this.user.tdusers.indexOf(id)
      if(idx !== -1) {
        this.user.tdusers.splice(idx, 1);
      }
    }
    console.log(this.user.tdusers)
  }
}
