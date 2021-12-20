import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SEARCH_ADVERTISEMENTS_MOCK } from 'src/app/__mocks__/search-advertisements';
import { AdvertisementsModule } from '../advertisements.module';
import { USER_DATA_MOCK } from '../../__mocks__/user-data';
import { AdListComponent } from './ad-list.component';

describe('AdListComponent', () => {
  let component: AdListComponent;
  let fixture: ComponentFixture<AdListComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          AdvertisementsModule,
          RouterTestingModule,
          NoopAnimationsModule,
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AdListComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all the advertisements passed in input', fakeAsync(() => {
    component.advertisements = SEARCH_ADVERTISEMENTS_MOCK;
    component.currentUser = USER_DATA_MOCK;
    fixture.detectChanges();

    const elements = el.queryAll(By.css('.adv-card'));

    expect(elements.length).toBe(SEARCH_ADVERTISEMENTS_MOCK.length);
  }));

  it("should render edit and delete buttons only in current user's ads", fakeAsync(() => {
    component.advertisements = SEARCH_ADVERTISEMENTS_MOCK;
    component.currentUser = USER_DATA_MOCK;

    fixture.detectChanges();

    const elements = el.queryAll(By.css('.adv-card'));

    const nonUserElement = elements[0];
    const userElement = elements[3];

    expect(nonUserElement.query(By.css('.adv-edit')))
      .withContext(
        'Non deve mostrare il bottone modifica su annunci di proprietà di un altro utente'
      )
      .toBeFalsy();

    expect(nonUserElement.query(By.css('.adv-delete')))
      .withContext(
        'Non deve mostrare il bottone cancella su annunci di proprietà di un altro utente'
      )
      .toBeFalsy();

    expect(userElement.query(By.css('.adv-edit')))
      .withContext(
        'Deve mostrare il bottone modifica su annunci di proprietà dell utente'
      )
      .toBeTruthy();

    expect(userElement.query(By.css('.adv-delete')))
      .withContext(
        'Deve mostrare il bottone cancella su annunci di proprietà dell utente'
      )
      .toBeTruthy();
  }));
});
