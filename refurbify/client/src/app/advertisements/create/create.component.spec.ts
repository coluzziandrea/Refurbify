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
import { NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { delay, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserGender } from 'src/app/model/user/user-gender';
import { User } from 'src/app/model/user/user.model';
import { MyAdvertisementsComponent } from 'src/app/user/my-advertisements/my-advertisements.component';
import { AdvertisementsModule } from '../advertisements.module';
import { AdvertisementService } from '../services/advertisement.service';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let el: DebugElement;
  let advertisementService: any;
  let authService: any;

  const category = 'informatica';
  const title = 'Lampadario';
  const description = 'Lampadario vecchio come nuovo';
  const price = 50;

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

  beforeEach(
    waitForAsync(() => {
      const advertisementServiceSpy = jasmine.createSpyObj(
        'AdvertisementService',
        ['createAdvertisement']
      );

      const authServiceSpy = jasmine.createSpyObj('AuthService', [
        'currentUser',
      ]);

      authServiceSpy.currentUser.and.returnValue(currentUser);

      TestBed.configureTestingModule({
        imports: [
          AdvertisementsModule,
          NoopAnimationsModule,
          RouterTestingModule.withRoutes([
            {
              path: 'user/my-advertisements',
              component: MyAdvertisementsComponent,
            },
          ]),
        ],
        providers: [
          { provide: AdvertisementService, useValue: advertisementServiceSpy },
          { provide: AuthService, useValue: authServiceSpy },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(CreateComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
          advertisementService = TestBed.inject(AdvertisementService);

          fixture.detectChanges();
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render controls for user input', fakeAsync(() => {
    const categorySelect = el.query(By.css('.adv-category'));
    const title = el.query(By.css('.adv-title'));
    const description = el.query(By.css('.adv-description'));
    const price = el.query(By.css('.adv-price'));

    expect(categorySelect)
      .withContext('Deve essere visibile la combo box categoria annuncio')
      .toBeTruthy();
    expect(title)
      .withContext('Deve essere visibile il titolo annuncio')
      .toBeTruthy();
    expect(description)
      .withContext('Deve essere visibile la descrizione annuncio')
      .toBeTruthy();
    expect(price)
      .withContext('Deve essere visibile il prezzo annuncio')
      .toBeTruthy();
  }));

  it("should not call service's creation with invalid form", fakeAsync(() => {
    component.onSubmit();

    expect(advertisementService.createAdvertisement).not.toHaveBeenCalled();
  }));

  it("should call service's creation with valid form", fakeAsync(() => {
    advertisementService.createAdvertisement.and.returnValue(of(true));

    component.currentUser = currentUser;

    component.adForm.controls['title'].setValue(title);
    component.adForm.controls['description'].setValue(description);
    component.adForm.controls['price'].setValue(price);
    component.adForm.controls['category'].setValue(category);

    component.onSubmit();

    expect(advertisementService.createAdvertisement).toHaveBeenCalled();
  }));

  it("should append user's properties to form's values", fakeAsync(() => {
    advertisementService.createAdvertisement.and.returnValue(of(true));

    component.currentUser = currentUser;

    component.adForm.controls['title'].setValue(title);
    component.adForm.controls['description'].setValue(description);
    component.adForm.controls['price'].setValue(price);
    component.adForm.controls['category'].setValue(category);

    component.onSubmit();

    expect(advertisementService.createAdvertisement).toHaveBeenCalledWith(
      jasmine.objectContaining({
        userId,
        userEmail,
        userCity,
        userName,
        category,
        title,
        description,
        price,
      })
    );
  }));

  it('should hide all other controls and show loading spinner on form submit', fakeAsync(() => {
    advertisementService.createAdvertisement.and.returnValue(
      of(true).pipe(delay(100))
    );

    component.currentUser = currentUser;

    component.adForm.controls['title'].setValue(title);
    component.adForm.controls['description'].setValue(description);
    component.adForm.controls['price'].setValue(price);
    component.adForm.controls['category'].setValue(category);

    expect(el.query(By.css('.loading-spinner')))
      .withContext('Deve essere invisibile lo spinner prima del submit')
      .toBeFalsy();

    component.onSubmit();

    fixture.detectChanges();

    const categorySelect = el.query(By.css('.adv-category'));
    const titleInput = el.query(By.css('.adv-title'));
    const descriptionInput = el.query(By.css('.adv-description'));
    const priceInput = el.query(By.css('.adv-price'));

    expect(categorySelect)
      .withContext('Deve essere invisibile la combo box categoria annuncio')
      .toBeFalsy();
    expect(titleInput)
      .withContext('Deve essere invisibile il titolo annuncio')
      .toBeFalsy();
    expect(descriptionInput)
      .withContext('Deve essere invisibile la descrizione annuncio')
      .toBeFalsy();
    expect(priceInput)
      .withContext('Deve essere invisibile il prezzo annuncio')
      .toBeFalsy();

    tick(100);

    expect(el.query(By.css('.loading-spinner')))
      .withContext('Deve essere visibile lo spinner dopo il submit')
      .toBeTruthy();
  }));

  it('should redirect to /user/my-advertisements on successfull submit', fakeAsync(() => {
    advertisementService.createAdvertisement.and.returnValue(of(true));

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.currentUser = currentUser;

    component.adForm.controls['title'].setValue(title);
    component.adForm.controls['description'].setValue(description);
    component.adForm.controls['price'].setValue(price);
    component.adForm.controls['category'].setValue(category);

    component.onSubmit();

    // make time pass for subscription of create advertisement tick(1000) works as well
    flushMicrotasks();

    expect(router.navigate).toHaveBeenCalledWith(['/user/my-advertisements']);
  }));

  it('should not render errors on successfull submit', fakeAsync(() => {
    advertisementService.createAdvertisement.and.returnValue(of(true));

    component.currentUser = currentUser;

    component.adForm.controls['title'].setValue(title);
    component.adForm.controls['description'].setValue(description);
    component.adForm.controls['price'].setValue(price);
    component.adForm.controls['category'].setValue(category);

    component.onSubmit();

    fixture.detectChanges();

    expect(el.query(By.css('.adv-form-error')))
      .withContext(
        'Gli errori non devono essere mostrati su risultato positivo'
      )
      .not.toBeTruthy();
  }));

  it('should render errors on failure submit', fakeAsync(() => {
    advertisementService.createAdvertisement.and.returnValue(of(false));

    component.currentUser = currentUser;

    component.adForm.controls['title'].setValue(title);
    component.adForm.controls['description'].setValue(description);
    component.adForm.controls['price'].setValue(price);
    component.adForm.controls['category'].setValue(category);

    component.onSubmit();

    fixture.detectChanges();

    expect(el.query(By.css('.adv-form-error')))
      .withContext('Gli errori devono essere mostrati su risultato negativo')
      .toBeTruthy();
  }));
});
