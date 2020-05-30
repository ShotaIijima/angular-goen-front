import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routing } from './message.routing';
import { SharedModule } from '../../shared/shared.module';
import { MessageComponent } from './message.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageIndexComponent } from './components/index.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        routing
    ],
    declarations: [
        MessageComponent,
        MessageIndexComponent,
        ChatComponent
    ]
})
export class MessageModule { }
