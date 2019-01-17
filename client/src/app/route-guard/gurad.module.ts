import { CoreModule } from './../core/core.module';
import { ManagerGuardService } from './manager.guard';
import { ClientGuardService } from './client.guard';
import { AdminGuardService } from './admin.guard';
import { NgModule } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CoreModule
    ],
    providers: [
        AdminGuardService,
        ClientGuardService,
        ManagerGuardService,
    ],
})
export class GuardsModule { }
