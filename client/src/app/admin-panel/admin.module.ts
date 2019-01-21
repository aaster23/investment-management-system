import { SharedModule } from './../shared/shared.module';
import { SharedMaterialModule } from './../shared/shared-material.module';
import { AdminPanelComponent } from './admin-panel.component';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

@NgModule({
    declarations: [
        AdminPanelComponent,
    ],
    imports: [SharedMaterialModule, SharedModule, CoreModule],
    providers: [],
    exports: [],
})
export class AdminModule { }
