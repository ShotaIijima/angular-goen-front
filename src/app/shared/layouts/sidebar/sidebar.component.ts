import {Component, Input, Output, EventEmitter, OnInit, HostListener, AfterViewInit} from '@angular/core';
import {menuService} from '../../services/menu.service';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [menuService]
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public menuInfo: Array<any> = [];
  public sidebarToggle = true;

  constructor(private _menuService: menuService,
              public _globalService: GlobalService) {
  }

  ngOnInit() {
    this.menuInfo = this._menuService.putSidebarJson();
    this._sidebarToggle();
    this._menuService.selectItem(this.menuInfo);
    this._isSelectItem(this.menuInfo);
  }

  public _sidebarToggle() {
    // this._globalService._sidebarToggleState(true);
    /* this._globalService.sidebarToggle$.subscribe(sidebarToggle => {
      this.sidebarToggle = sidebarToggle;
    }, error => {
      console.log('Error: ' + error);
    }); */
    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });

  }

  _isSelectItem(item) {
    for (const i in item) {
      if (item[i].children) {
        for (const index in item[i].children) {
          if (item[i].children[index].isActive || item[i].children[index].toggle === 'on') {
            item[i].toggle = 'on';
            break;
          } else {
            this._isSelectItem(item[i].children);
          }
        }
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sidebarToggle = window.innerWidth >= 970;
    console.log(window.innerWidth);
  }

  ngAfterViewInit(): void {
    this.sidebarToggle = window.innerWidth >= 970;
    console.log(window.innerWidth);
  }
}
