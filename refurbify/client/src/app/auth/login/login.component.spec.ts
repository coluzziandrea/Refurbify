import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthModule } from '../auth.module';
import { AuthService } from '../services/auth.service';
import { USER_DATA_MOCK } from '../../__mocks__/user-data';

import { LoginComponent } from './login.component';
import { UserHomeComponent } from 'src/app/user/home/user-home.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let authService: any;

  beforeEach(
    waitForAsync(() => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', [
        'signin',
        'getCurrentUserListener',
      ]);

      TestBed.configureTestingModule({
        imports: [
          AuthModule,
          NoopAnimationsModule,
          RouterTestingModule.withRoutes([
            { path: 'user/home', component: UserHomeComponent },
          ]),
        ],
        providers: [{ provide: AuthService, useValue: authServiceSpy }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(LoginComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;

          authService = TestBed.inject(AuthService);

          authService.getCurrentUserListener.and.returnValue(
            of(USER_DATA_MOCK)
          );
          fixture.detectChanges();
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render input for user's data", () => {
    const emailInput = el.query(By.css('input[name="email"]'));
    const passwordInput = el.query(By.css('input[name="password"]'));

    expect(emailInput).withContext('Could not find email input').toBeTruthy();
    expect(passwordInput)
      .withContext('Could not find email input')
      .toBeTruthy();
  });

  it('should call authService when login is clicked with valid form', () => {
    const myEmail = 'user@example.com';
    const myPwd = 'user@example.com';

    const testForm = <NgForm>{
      value: {
        email: myEmail,
        password: myPwd,
      },
    };

    component.onLogin(testForm);

    expect(authService.signin).toHaveBeenCalledWith(myEmail, myPwd);
  });
});
