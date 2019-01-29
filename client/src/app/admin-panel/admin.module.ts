import { SharedModule } from './../shared/shared.module';
import { SharedMaterialModule } from './../shared/shared-material.module';
import { AdminPanelComponent } from './admin-panel.component';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ManageComponent } from './manage/manage.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [
        AdminPanelComponent,
        ManageComponent,
        UsersComponent,
        RegisterComponent,
    ],
    imports: [SharedMaterialModule, SharedModule, CoreModule],
    providers: [],
    exports: [ ],
})
export class AdminModule { }
