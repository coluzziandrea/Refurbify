import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { delay, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Advertisement } from 'src/app/model/advertisement/advertisement.model';
import { User } from 'src/app/model/user/user.model';
import { SEARCH_ADVERTISEMENTS_MOCK } from 'src/app/__mocks__/search-advertisements';
import { USER_DATA_MOCK } from 'src/app/__mocks__/user-data';
import { AdListComponent } from '../ad-list/ad-list.component';
import { AdvertisementsModule } from '../advertisements.module';
import { AdvertisementService } from '../services/advertisement.service';

import { SearchComponent } from './search.component';

@Component({ selector: 'app-ad-list', template: '' })
class AdListStubComponent {
  @Input()
  advertisements!: Advertisement[];

  @Input()
  currentUser!: User;

  @Output()
  onDeleteAd = new EventEmitter<string>();
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let el: DebugElement;
  let advertisementService: any;

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
      const authServiceSpy = jasmine.createSpyObj('AuthService', [
        'currentUser',
      ]);

      const advertisementServiceSpy = jasmine.createSpyObj(
        'AdvertisementService',
        ['searchAdvertisements', 'deleteAdvertisement']
      );

      TestBed.configureTestingModule({
        declarations: [AdListStubComponent],
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
    const titleInput = el.query(By.css('.adv-title'));
    const cityInput = el.query(By.css('.adv-city'));

    expect(categorySelect)
      .withContext('Deve essere visibile la combo box categoria annuncio')
      .toBeTruthy();
    expect(titleInput)
      .withContext('Deve essere visibile il box per il titolo')
      .toBeTruthy();
    expect(cityInput)
      .withContext('Deve essere visibile il box per la città')
      .toBeTruthy();
  }));

  it('should show loading spinner when submitted', fakeAsync(() => {
    advertisementService.searchAdvertisements.and.returnValue(
      of([]).pipe(delay(100))
    );

    expect(el.query(By.css('.loading-spinner')))
      .withContext('Deve essere invisibile lo spinner prima del submit')
      .toBeFalsy();

    component.onSearch();

    fixture.detectChanges();

    expect(el.query(By.css('.loading-spinner')))
      .withContext('Deve essere visibile lo spinner dopo il submit')
      .toBeTruthy();

    tick(100);
    fixture.detectChanges();

    expect(el.query(By.css('.loading-spinner')))
      .withContext(
        'Deve essere invisibile lo spinner prima dopo il ritorno dal service'
      )
      .toBeFalsy();
  }));

  it('should call service search on submit', fakeAsync(() => {
    const title = 'Lampadario';
    const category = 'informatica';
    const city = 'Roma';

    fixture.detectChanges();

    component.searchForm.controls['title'].setValue(title);
    component.searchForm.controls['category'].setValue(category);
    component.searchForm.controls['city'].setValue(city);

    advertisementService.searchAdvertisements.and.returnValue(of([]));
    component.onSearch();

    expect(advertisementService.searchAdvertisements).toHaveBeenCalledWith(
      title,
      category,
      city
    );
  }));

  it('should call service search with no category if all is selected', fakeAsync(() => {
    const title = 'Lampadario';
    const category = 'all';
    const city = 'Roma';

    fixture.detectChanges();

    component.searchForm.controls['title'].setValue(title);
    component.searchForm.controls['category'].setValue(category);
    component.searchForm.controls['city'].setValue(city);

    advertisementService.searchAdvertisements.and.returnValue(of([]));

    component.onSearch();

    expect(advertisementService.searchAdvertisements).toHaveBeenCalledWith(
      title,
      '',
      city
    );
  }));

  it('should render ad list on successfull submit with the right objects', fakeAsync(() => {
    const ads = SEARCH_ADVERTISEMENTS_MOCK;

    advertisementService.searchAdvertisements.and.returnValue(of(ads));

    component.currentUser = currentUser;

    component.onSearch();

    fixture.detectChanges();

    flush();

    const adList = el.query(By.css('app-ad-list'));
    const listComponent: AdListStubComponent = adList.componentInstance;

    expect(listComponent.advertisements).toEqual(ads);
    expect(listComponent.currentUser.id).toEqual(currentUser.id);
  }));

  it('should call service delete on ad list output', fakeAsync(() => {
    const ads = SEARCH_ADVERTISEMENTS_MOCK;
    advertisementService.searchAdvertisements.and.returnValue(of(ads));
    component.currentUser = currentUser;
    component.onSearch();
    fixture.detectChanges();

    flush();

    const adList = el.query(By.css('app-ad-list'));
    const listComponent: AdListStubComponent = adList.componentInstance;

    const adId = '12345';

    listComponent.onDeleteAd.emit(adId);

    expect(advertisementService.deleteAdvertisement).toHaveBeenCalledWith(adId);
  }));
});
