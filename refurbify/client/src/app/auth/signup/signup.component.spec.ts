import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SignupComponent } from './signup.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../services/auth.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let el: DebugElement;

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
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
