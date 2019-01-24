import { AdminGuardService } from './route-guard/admin.guard';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: AdminPanelComponent, canActivate: [AdminGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'client', loadChildren: './client-panel/client.module#ClientModule' },
    { path: 'manager', loadChildren: './manager-panel/manager.module#ManagerModule'/*, canActivate: [AdminGuardService]*/ },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
