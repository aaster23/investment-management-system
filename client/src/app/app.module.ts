import { ClientModule } from './client-panel/client.module';
import { NotFoundComponent } from './not-found-page/404.component';
import { AdminModule } from './admin-panel/admin.module';
import { GuardsModule } from './route-guard/gurad.module';
import { AppConfig } from './config/app.config';
import { AppRoutingModule } from './app.router.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedMaterialModule } from './shared/shared-material.module';
import { ModalComponent } from './client-panel/stocks/modal/modal.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    GuardsModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: [],
      },
    }),
  ],
  entryComponents: [ModalComponent],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
