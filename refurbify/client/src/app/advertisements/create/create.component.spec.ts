import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AdvertisementsModule } from '../advertisements.module';
import { AdvertisementService } from '../services/advertisement.service';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let el: DebugElement;
  let advertisementService: any;

  beforeEach(
    waitForAsync(() => {
      const advertisementServiceSpy = jasmine.createSpyObj(
        'AdvertisementService',
        ['createAdvertisement']
      );

      TestBed.configureTestingModule({
        imports: [AdvertisementsModule, NoopAnimationsModule],
        providers: [
          { provide: AdvertisementService, useValue: advertisementServiceSpy },
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

  it('should render input for user input', fakeAsync(() => {
    const categorySelect = el.query(By.css('.ad-category'));
    const title = el.query(By.css('.ad-title'));
    const description = el.query(By.css('.ad-description'));
    const price = el.query(By.css('.ad-price'));

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
});
