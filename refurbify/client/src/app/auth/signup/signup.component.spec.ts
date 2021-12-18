import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthModule } from '../auth.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SignupComponent } from './signup.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../services/auth.service';
import { By } from '@angular/platform-browser';
import { click } from 'src/app/common/util/test-utils';
import { delay, of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let el: DebugElement;
  let authService: any;

  beforeEach(
    waitForAsync(() => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', [
        'signup',
        'getAuthStatusListener',
      ]);

      TestBed.configureTestingModule({
        imports: [AuthModule, NoopAnimationsModule],
        providers: [{ provide: AuthService, useValue: authServiceSpy }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(SignupComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
          authService = TestBed.inject(AuthService);

          authService.getAuthStatusListener.and.returnValue(of(true));
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render input for user's data", () => {
    fixture.detectChanges();

    const emailInput = el.query(By.css('input[name="email"]'));
    const passwordInput = el.query(By.css('input[name="password"]'));
    const nameInput = el.query(By.css('input[name="name"]'));
    const birthInput = el.query(By.css('input[name="birthDate"]'));
    const genderInput = el.query(By.css('mat-select[name="gender"]'));
    const cityInput = el.query(By.css('input[name="city"]'));

    expect(emailInput).withContext('Could not find email input').toBeTruthy();
    expect(passwordInput)
      .withContext('Could not find email input')
      .toBeTruthy();
    expect(nameInput).withContext('Could not find name input').toBeTruthy();
    expect(birthInput)
      .withContext('Could not find birthDate input')
      .toBeTruthy();
    expect(genderInput).withContext('Could not find gender input').toBeTruthy();
    expect(cityInput).withContext('Could not find city input').toBeTruthy();
  });

  it('should call authService when signup is clicked with valid form', () => {
    fixture.detectChanges();

    const myEmail = 'user@example.com';
    const myPwd = 'user@example.com';
    const myName = 'Mario';
    const myDate = new Date();
    const myGender = 'maschio';
    const myCity = 'Rome';

    const testForm = <NgForm>{
      value: {
        email: myEmail,
        password: myPwd,
        name: myName,
        birthDate: myDate,
        gender: myGender,
        city: myCity,
      },
    };

    component.onSignup(testForm);

    expect(authService.signup).toHaveBeenCalledWith(
      myEmail,
      myPwd,
      myName,
      myDate,
      myGender,
      myCity
    );
  });
});
