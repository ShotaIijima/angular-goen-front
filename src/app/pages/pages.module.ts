import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './pages.routing';
import { ModalModule } from 'ngx-modal';

import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';

/* components */
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
//import { ModalsComponent } from './ui/components/modals/modals.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,
        FormsModule,
        ModalModule,
        routing
    ],
    declarations: [
        PagesComponent,
        LoginComponent,
        SigninComponent,
    ]
})
export class PagesModule { }
