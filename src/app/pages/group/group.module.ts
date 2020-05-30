import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routing } from './group.routing';
import { SharedModule } from '../../shared/shared.module';
import { GroupComponent } from './group.component';
import { DetailProfileComponent } from './components/detail_profile/detail_profile.component';
import { GroupIndexComponent } from './components/index.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        routing
    ],
    declarations: [
        GroupComponent,
        GroupIndexComponent,
        DetailProfileComponent
    ]
})
export class GroupModule { }
