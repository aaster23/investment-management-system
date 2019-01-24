import { SharedModule } from './../shared/shared.module';
import { SharedMaterialModule } from './../shared/shared-material.module';
import { AdminPanelComponent } from './admin-panel.component';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ManageComponent } from './manage/manage.component';

@NgModule({
    declarations: [
        AdminPanelComponent,
        ManageComponent,
    ],
    imports: [SharedMaterialModule, SharedModule],
    providers: [],
    exports: [],
})
export class AdminModule { }
