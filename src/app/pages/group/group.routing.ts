import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';
import { DetailProfileComponent } from './components/detail_profile/detail_profile.component';
import { GroupIndexComponent } from './components/index.component';

const childRoutes: Routes = [
    {
        path: '',
        component: GroupComponent,
        children: [
            { path: '', component: GroupIndexComponent },
            { path: 'profile', component: DetailProfileComponent }
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
