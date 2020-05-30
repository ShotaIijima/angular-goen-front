import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './message.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageIndexComponent } from './components/index.component';

const childRoutes: Routes = [
    {
        path: '',
        component: MessageComponent,
        children: [
            { path: '', component: MessageIndexComponent },
            { path: 'chat', component: ChatComponent }
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
