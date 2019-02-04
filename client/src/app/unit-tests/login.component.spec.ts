import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from '../login/login.component';
import { CoreModule } from '../core/core.module';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { MatInputModule } from '@angular/material';
import { BrowserModule, By } from '@angular/platform-browser';
import { AdminModule } from '../admin-panel/admin.module';
import { GuardsModule } from '../route-guard/gurad.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app.router.module';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from '../app.module';
import { NotFoundComponent } from '../not-found-page/404.component';
import { DebugElement } from '@angular/core';
import { NotificationService } from '../core/notification.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const notif: NotificationService = new NotificationService(null);
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, NotFoundComponent],
      imports: [BrowserModule,
        AdminModule,
        GuardsModule,
        BrowserAnimationsModule,
        SharedMaterialModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        MatInputModule,
        JwtModule.forRoot({
          config: {
            tokenGetter,
            whitelistedDomains: ['localhost:3000'],
            blacklistedRoutes: [],
          },
        }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });


  it('form should be valid', () => {
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('secret123');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call login method once', async(() => {
    spyOn(component, 'login');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(1);
  }));
});
