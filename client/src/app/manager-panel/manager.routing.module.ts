import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagerPanelComponent } from './manager-panel.component';


const routes = [
    { path: '', component: ManagerPanelComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerRoutingModule { }
