import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    { path: 'register', component: AdminPanelComponent, },
    { path: 'login', component: LoginComponent },
    { path: 'manager', loadChildren: './manager-panel/manager.module#ManagerModule' },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
