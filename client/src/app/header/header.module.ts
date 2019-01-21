import { SharedModule } from './../shared/shared.module';
import { SharedMaterialModule } from './../shared/shared-material.module';
import { HeaderComponent } from './../header/header.component';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [SharedMaterialModule, SharedModule, CoreModule],
    providers: [],
    exports: [HeaderComponent],
})
export class HeaderModule { }
