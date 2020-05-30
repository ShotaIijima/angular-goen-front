import { Component } from '@angular/core';
import { SpinnerService } from '../shared/services/spinner.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent { 

  constructor(
    public spinner: SpinnerService
  ){}
}
