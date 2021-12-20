import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdvertisementCreateData } from 'src/app/model/advertisement/advertisement.create.model';
import { Advertisement } from 'src/app/model/advertisement/advertisement.model';
import { User } from 'src/app/model/user/user.model';
import { environment } from 'src/environments/environment';
import { NEAREST_ADVERTISEMENTS_MOCK } from '../../__mocks__/nearest-advertisements';

const BACKEND_URL = environment.advertisementApiUrl;

@Injectable({ providedIn: 'root' })
export class AdvertisementService {
  constructor(private http: HttpClient) {}

  findNearAdvertisements(user: User): Observable<Advertisement[]> {
    return of(NEAREST_ADVERTISEMENTS_MOCK);
  }

  createAdvertisement(
    advertisementData: AdvertisementCreateData
  ): Observable<Boolean> {
    return of(true);
  }

  searchAdvertisements(
    title: string,
    category: string,
    city: string
  ): Observable<Advertisement[]> {
    return of([]);
  }
}
