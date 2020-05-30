import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { RelationService } from './shared/services/relation.service';
import { UserService } from './shared/services/user.service';
import { MasterService } from './shared/services/master.service';
import { HtCliInterceptor } from './htcli_intercepter';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerService } from './shared/services/spinner.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PagesModule,
    routing,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    AuthService,
    RelationService,
    UserService,
    MasterService,
    SpinnerService,
    AngularFirestore,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HtCliInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
