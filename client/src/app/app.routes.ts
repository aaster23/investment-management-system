import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found-page/404.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: AdminPanelComponent/*, canActivate: [AdminGuardService]*/ },
    { path: 'login', component: LoginComponent },
    { path: '404', component: NotFoundComponent },
    { path: 'manager', loadChildren: './manager-panel/manager.module#ManagerModule'/*,  canActivate: [ManagerGuardService] */ },
    { path: 'client', loadChildren: './client-panel/client.module#ClientModule' },
    { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
