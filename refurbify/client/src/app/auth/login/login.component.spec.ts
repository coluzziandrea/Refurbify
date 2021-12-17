import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '../auth.module';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

      TestBed.configureTestingModule({
        imports: [AuthModule, NoopAnimationsModule],
        providers: [{ provide: AuthService, useValue: authServiceSpy }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(LoginComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
