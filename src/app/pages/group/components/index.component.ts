import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { RelationService } from '../../../shared/services/relation.service';
import { User } from '../../../shared/models/User';
import { Router } from '@angular/router';
import { msgs } from '../../../msgs';

@Component({
  selector: 'group-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class GroupIndexComponent implements OnInit {
  rels: any[];
  showSearchDiagFlg: boolean = false;
  isMng: boolean;
  matchingSuccessMsg: string = null;
  matchingErrMsg: string = null;
  updateSuccessMsg: string = null;
  updateErrMsg: string = null;
  searchRank: string = null;
  searchStatus: string = null;
  searchAny: string = null;

  constructor(
    private _rel: RelationService,
    private _user: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rels = this._rel.getRelations();
    this.isMng = this._user.isMng();
    console.log(this.rels)
  }

  goProfilePage(user_id) {
    console.log(user_id)
    this.router.navigate(['/pages/group/profile']);
  }

  showMessage(user_id) {
    return;
  }

  searchUser() {
    this._rel.searchUser(this.searchRank, this.searchStatus, this.searchAny)
  }

  onChangeSearchDiagFlg(checked) {
    this.showSearchDiagFlg = checked;
  }

  onChange(id, isChecked) {
    var visible = isChecked ? 1 : 0;
    for(var i=0; i<this.rels.length; i++) {
      if(this.rels[i].id === id)
        this.rels[i].visible = visible;
    }
  }

  updateMemoGrade(user_id) {
    this._rel.updateRelations(user_id)
    .then((res) => {
      if(res) {
        this.updateSuccessMsg = msgs.ERR_MSG_GROUP_UPDATE_SUC
      } else {
        this.updateErrMsg = msgs.ERR_MSG_GROUP_UPDATE_ERR
      }
    })
    .catch((err) => {
      console.log(err)
      this.updateErrMsg = msgs.ERR_MSG_GROUP_UPDATE_ERR;
    })
  }

  goodbye(user_id) {
    this._rel.updateRelType(user_id, -1)
    .then((res) => {
      if(res) {
        this.matchingSuccessMsg = msgs.MSG_RELTYPE_UPDATE_minus1_SUC
      } else {
        this.matchingErrMsg = msgs.ERR_MSG_RELTYPE_UPDATE_ERR
      }
    })
    .catch((err) => {
      console.log(err)
      this.matchingErrMsg = msgs.ERR_MSG_RELTYPE_UPDATE_ERR;
    })
  }

  matching(user_id) {
    this._rel.updateRelType(user_id, 1)
    .then((res) => {
      if(res) {
        this.matchingSuccessMsg = msgs.MSG_RELTYPE_UPDATE_1_SUC
      } else {
        this.matchingErrMsg = msgs.ERR_MSG_RELTYPE_UPDATE_ERR
      }
    })
    .catch((err) => {
      console.log(err)
      this.matchingErrMsg = msgs.ERR_MSG_RELTYPE_UPDATE_ERR;
    })
  }

  unmatching(user_id) {
    this._rel.updateRelType(user_id, 0)
    .then((res) => {
      if(res) {
        this.matchingSuccessMsg = msgs.MSG_RELTYPE_UPDATE_0_SUC
      } else {
        this.matchingErrMsg = msgs.ERR_MSG_RELTYPE_UPDATE_ERR
      }
    })
    .catch((err) => {
      console.log(err)
      this.matchingErrMsg = msgs.ERR_MSG_RELTYPE_UPDATE_ERR;
    })
  }
}
