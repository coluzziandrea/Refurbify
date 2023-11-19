import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/services/auth.service';
import { USER_DATA_MOCK } from '../__mocks__/user-data';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;
  let authService: any;

  beforeEach(
    waitForAsync(() => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', [
        'getCurrentUserListener',
        'autoAuthUser',
      ]);

      TestBed.configureTestingModule({
        imports: [AppModule, NoopAnimationsModule, RouterTestingModule],
        providers: [{ provide: AuthService, useValue: authServiceSpy }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(HeaderComponent);
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
});
