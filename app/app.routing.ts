import { Routes, RouterModule } from '@angular/router';

import { ContactItemFormComponent } from './contact-item-form.component';
import { ContactItemListComponent } from './contact-item-list.component';

const appRoutes: Routes = [
  { path: 'add', component: ContactItemFormComponent, data:{name:'gotcha'} },
  { path: ':name', component: ContactItemListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all' }
];

export const routing = RouterModule.forRoot(appRoutes);
