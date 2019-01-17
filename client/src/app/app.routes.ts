import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { Routes } from '@angular/router';
import { SidebarComponent } from './manager/sidebar.component';

export const ROUTES: Routes = [
    { path: 'register', component: AdminPanelComponent },
    { path: 'login', component: LoginComponent },
    { path: 'manager', component: SidebarComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
