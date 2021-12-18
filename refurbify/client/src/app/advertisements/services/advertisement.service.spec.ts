import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
});
