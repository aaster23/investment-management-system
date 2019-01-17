import { ManagerGuardService } from './route-guard/manager.guard';
import { AdminGuardService } from './route-guard/admin.guard';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { Routes } from '@angular/router';
import { SidebarComponent } from './manager/sidebar.component';

export const ROUTES: Routes = [
    { path: 'register', component: AdminPanelComponent, /*canActivate: [AdminGuardService] */},
    { path: 'login', component: LoginComponent },
    { path: 'manager', component: SidebarComponent, /* canActivate: [ManagerGuardService]*/ },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
