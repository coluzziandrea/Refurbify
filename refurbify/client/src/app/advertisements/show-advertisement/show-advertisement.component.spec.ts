import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/model/user/user.model';
import { SUCCESSFULL_GET_ADVERTISEMENT_MOCK } from 'src/app/__mocks__/get-advertisement';
import { AdvertisementsModule } from '../advertisements.module';
import { AdvertisementService } from '../services/advertisement.service';

import { ShowAdvertisementComponent } from './show-advertisement.component';

const userId = '123456';
const userEmail = 'test@test.com';
const userName = 'Mario Rossi';
const userCity = 'Roma';

const userBirth = new Date().getTime();
const userGender = 'maschio';

const currentUser: User = {
  id: userId,
  email: userEmail,
  name: userName,
  birthDate: userBirth,
  gender: userGender,
  city: userCity,
};

describe('ShowAdvertisementComponent', () => {
  let component: ShowAdvertisementComponent;
  let fixture: ComponentFixture<ShowAdvertisementComponent>;
  let el: DebugElement;
  let advertisementService: any;

  let advertisement = SUCCESSFULL_GET_ADVERTISEMENT_MOCK.data!;

  const myAdID = '24fkzrw3487943uf358lovd';

  beforeEach(
    waitForAsync(() => {
      const advertisementServiceSpy = jasmine.createSpyObj(
        'AdvertisementService',
        ['getAdvertisement']
      );

      TestBed.configureTestingModule({
        imports: [
          AdvertisementsModule,
          NoopAnimationsModule,
          RouterTestingModule,
        ],
        providers: [
          { provide: AdvertisementService, useValue: advertisementServiceSpy },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: { params: { id: myAdID } },
            },
          },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(ShowAdvertisementComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
          advertisementService = TestBed.inject(AdvertisementService);
        });
    })
  );
  it('should create', () => {
    advertisementService.getAdvertisement.and.returnValue(of(advertisement));

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should query advertisement service for current ad ID', fakeAsync(() => {
    advertisementService.getAdvertisement.and.returnValue(of(advertisement));

    fixture.detectChanges();

    expect(advertisementService.getAdvertisement).toHaveBeenCalledWith(myAdID);
  }));

  it('should render retrieved advertisement informations', fakeAsync(() => {
    advertisementService.getAdvertisement.and.returnValue(of(advertisement));

    fixture.detectChanges();

    expect(
      el.query(By.css('.adv-title')).nativeElement.textContent.trim()
    ).toBe(advertisement.title);

    expect(
      el.query(By.css('.adv-price')).nativeElement.textContent.trim()
    ).toBe(advertisement.price + ' €');

    expect(
      el.query(By.css('.adv-category')).nativeElement.textContent.trim()
    ).toBe('Arredamento');

    expect(
      el.query(By.css('.adv-description')).nativeElement.textContent.trim()
    ).toBe(advertisement.description);

    expect(
      el.query(By.css('.adv-owner')).nativeElement.textContent.trim()
    ).toBe(advertisement.userName);

    expect(
      el.query(By.css('.adv-createdAt')).nativeElement.textContent.trim()
    ).toBe('23/05/1970 22:21');

    expect(el.query(By.css('.adv-contact')).nativeElement.href).toBe(
      'mailto:mario.rossi@gmail.com'
    );
  }));
});
