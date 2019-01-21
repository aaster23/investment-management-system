import { HeaderModule } from './../header/header.module';
import { SharedModule } from './../shared/shared.module';
import { SharedMaterialModule } from './../shared/shared-material.module';
import { HeaderComponent } from './../header/header.component';
import { AdminPanelComponent } from './admin-panel.component';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

@NgModule({
    declarations: [
        AdminPanelComponent,
    ],
    imports: [SharedMaterialModule, SharedModule, CoreModule, HeaderModule],
    providers: [],
    exports: [],
})
export class AdminModule { }
