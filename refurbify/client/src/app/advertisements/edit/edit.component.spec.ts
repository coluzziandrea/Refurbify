import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MyAdvertisementsComponent } from 'src/app/user/my-advertisements/my-advertisements.component';
import { SUCCESSFULL_GET_ADVERTISEMENT_MOCK } from 'src/app/__mocks__/get-advertisement';
import { AdvertisementsModule } from '../advertisements.module';
import { AdvertisementService } from '../services/advertisement.service';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let el: DebugElement;
  let advertisementService: any;

  const category = 'informatica';
  const title = 'Lampadario';
  const description = 'Lampadario vecchio come nuovo';
  const price = 50;

  let advertisement = SUCCESSFULL_GET_ADVERTISEMENT_MOCK.data!;

  const myAdID = '24fkzrw3487943uf358lovd';

  beforeEach(
    waitForAsync(() => {
      const advertisementServiceSpy = jasmine.createSpyObj(
        'AdvertisementService',
        ['updateAdvertisement', 'getAdvertisement']
      );

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
          fixture = TestBed.createComponent(EditComponent);
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

  it('should render retrieved advertisement informations', fakeAsync(() => {
    advertisementService.getAdvertisement.and.returnValue(of(advertisement));
    flushMicrotasks();
    flush();
    tick();

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.adForm.value.title).toBe(advertisement.title);
    expect(component.adForm.value.description).toBe(advertisement.description);
    expect(component.adForm.value.price).toBe(advertisement.price);
    expect(component.adForm.value.category).toBe(
      advertisement.category.toLowerCase()
    );

    tick();
  }));

  it("should call advertisement service's update with valid form", fakeAsync(() => {
    advertisementService.getAdvertisement.and.returnValue(of(advertisement));

    advertisementService.updateAdvertisement.and.returnValue(of(true));

    fixture.detectChanges();
    component.ngOnInit();

    component.adForm.value.title = title;
    component.adForm.value.category = category;
    component.adForm.value.description = description;
    component.adForm.value.price = price;

    component.onSubmit();

    expect(advertisementService.updateAdvertisement).toHaveBeenCalledWith(
      myAdID,
      title,
      description,
      price,
      category
    );
  }));
});
