import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StocksComponent } from '../client-panel/stocks/stocks.component';
import { ClientPanelComponent } from './client-panel.component';
import { PortfolioComponent } from './portfolio/portfolio.component';


const routes = [
    {
        path: '', component: ClientPanelComponent,
        children:
        [
            { path: 'stocks', component: StocksComponent, pathMatch: 'full'},
            { path: 'portfolio', component: PortfolioComponent, pathMatch: 'full'}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule { }
