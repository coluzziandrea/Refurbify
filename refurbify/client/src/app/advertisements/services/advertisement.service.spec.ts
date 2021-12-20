import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { AdvertisementCreateData } from 'src/app/model/advertisement/advertisement.create.model';
import { Advertisement } from 'src/app/model/advertisement/advertisement.model';
import { SEARCH_ADVERTISEMENTS_MOCK } from 'src/app/__mocks__/search-advertisements';
import { USER_DATA_MOCK } from 'src/app/__mocks__/user-data';
import { AdvertisementService } from './advertisement.service';

describe('AdvertisementService', () => {
  let advertisementService: AdvertisementService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdvertisementService],
    });

    advertisementService = TestBed.inject(AdvertisementService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(advertisementService).toBeTruthy();
  });

  it('#findNearAdvertisements should exec a get on /api/advertisements with userCity as parameter', fakeAsync(() => {
    const user = USER_DATA_MOCK;

    advertisementService.findNearAdvertisements(user).subscribe();

    flushMicrotasks();

    const req = httpTestingController.expectOne((req) =>
      req.url.startsWith('/api/advertisements')
    );

    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('userId')).toEqual('');
    expect(req.request.params.get('title')).toEqual('');
    expect(req.request.params.get('category')).toEqual('');
    expect(req.request.params.get('city')).toEqual(user.city);
  }));

  it('#searchAdvertisements should exec a get on /api/advertisements with title,category and city as parameters', fakeAsync(() => {
    const title = 'Lampadario';
    const category = 'arredamento';
    const city = 'Roma';

    advertisementService
      .searchAdvertisements(title, category, city)
      .subscribe();

    flushMicrotasks();

    const req = httpTestingController.expectOne((req) =>
      req.url.startsWith('/api/advertisements')
    );
    expect(req.request.method).toEqual('GET');

    expect(req.request.params.get('userId')).toEqual('');
    expect(req.request.params.get('title')).toEqual(title);
    expect(req.request.params.get('category')).toEqual(category);
    expect(req.request.params.get('city')).toEqual(city);
  }));

  it('#searchAdvertisements should return advertisements read from response', fakeAsync(() => {
    const title = 'Lampadario';
    const category = 'arredamento';
    const city = 'Roma';

    let ads: Advertisement[] = [];

    advertisementService
      .searchAdvertisements(title, category, city)
      .subscribe((res) => (ads = res));

    const req = httpTestingController.expectOne((req) =>
      req.url.startsWith('/api/advertisements')
    );

    req.flush(SEARCH_ADVERTISEMENTS_MOCK);

    flushMicrotasks();

    expect(ads).toEqual(SEARCH_ADVERTISEMENTS_MOCK);
  }));

  it('#createAdvertisement should execute a post on /api/advertisements with advertisement data as body', fakeAsync(() => {
    const data: AdvertisementCreateData = {
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario come nuovo',
      price: 23,
      createdAt: new Date().getTime(),
    };

    advertisementService.createAdvertisement(data).subscribe();

    const req = httpTestingController.expectOne('/api/advertisements');

    expect(req.request.method).toEqual('POST');

    expect(req.request.body).toEqual(data);
  }));
});
