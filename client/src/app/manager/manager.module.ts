import { HeaderModule } from './../header/header.module';
import { CoreModule } from './../core/core.module';
import { HeaderComponent } from './../header/header.component';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { ManagerPanelComponent } from './manager-panel.component';

@NgModule({
    declarations: [
        ManagerPanelComponent,
    ],
    imports: [SharedMaterialModule, SharedModule, CoreModule, HeaderModule],
    providers: [],
    exports: [],
})
export class ManagerModule { }
