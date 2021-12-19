import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { USER_DATA_MOCK } from 'src/app/__mocks__/user-data';
import { AdvertisementsModule } from '../advertisements.module';
import { AdvertisementService } from '../services/advertisement.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let el: DebugElement;
  let authService: any;

  beforeEach(
    waitForAsync(() => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', [
        'getCurrentUserListener',
        'autoAuthUser',
      ]);

      const advertisementServiceSpy = jasmine.createSpyObj(
        'AdvertisementService',
        ['findNearAdvertisements']
      );

      TestBed.configureTestingModule({
        imports: [
          AdvertisementsModule,
          RouterTestingModule,
          NoopAnimationsModule,
        ],
        providers: [
          { provide: AuthService, useValue: authServiceSpy },
          { provide: AdvertisementService, useValue: advertisementServiceSpy },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(SearchComponent);
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

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
