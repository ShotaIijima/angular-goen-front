import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'message',
  template: `<router-outlet></router-outlet>`
})
export class MessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

