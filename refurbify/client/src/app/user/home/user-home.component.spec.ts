import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AdvertisementService } from 'src/app/advertisements/services/advertisement.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NEAREST_ADVERTISEMENTS_MOCK } from 'src/app/__mocks__/nearest-advertisements';
import { USER_DATA_MOCK } from 'src/app/__mocks__/user-data';
import { UserModule } from '../user.module';

import { UserHomeComponent } from './user-home.component';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;
  let el: DebugElement;
  let authService: any;
  let advertisementService: any;

  beforeEach(
    waitForAsync(() => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', [
        'autoAuthUser',
        'getCurrentUserListener',
      ]);

      const adServiceSpy = jasmine.createSpyObj('AdvertisementService', [
        'findNearAdvertisements',
      ]);

      TestBed.configureTestingModule({
        imports: [UserModule, NoopAnimationsModule, RouterTestingModule],
        providers: [
          { provide: AuthService, useValue: authServiceSpy },
          {
            provide: AdvertisementService,
            useValue: adServiceSpy,
          },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(UserHomeComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;

          authService = TestBed.inject(AuthService);
          advertisementService = TestBed.inject(AdvertisementService);

          authService.getCurrentUserListener.and.returnValue(
            of(USER_DATA_MOCK)
          );
          advertisementService.findNearAdvertisements.and.returnValue(
            of(NEAREST_ADVERTISEMENTS_MOCK)
          );
          fixture.detectChanges();
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
