import { GuardsModule } from './route-guard/gurad.module';
import { AppConfig } from './config/app.config';
import { HeaderComponent } from './header/header.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
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
import { SidebarComponent } from './manager/sidebar.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPanelComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    GuardsModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: [],
      },
    }),
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
