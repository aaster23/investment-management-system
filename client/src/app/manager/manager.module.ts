import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { ManagerPanelComponent } from './manager-panel.component';

@NgModule({
    declarations: [
        ManagerPanelComponent,
    ],
    imports: [SharedMaterialModule, SharedModule, CoreModule],
    providers: [],
    exports: [],
})
export class ManagerModule { }
