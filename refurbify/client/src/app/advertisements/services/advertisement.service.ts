import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AdvertisementCreateData } from 'src/app/model/advertisement/advertisement.create.model';
import { Advertisement } from 'src/app/model/advertisement/advertisement.model';
import { ResponseData } from 'src/app/model/response-data.model';
import { User } from 'src/app/model/user/user.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.advertisementApiUrl;

@Injectable({ providedIn: 'root' })
export class AdvertisementService {
  constructor(private http: HttpClient) {}

  findNearAdvertisements(user: User): Observable<Advertisement[]> {
    // just search ads with current user's city
    return this.searchAds('', '', '', user.city);
  }

  searchAdvertisements(
    title: string,
    category: string,
    city: string
  ): Observable<Advertisement[]> {
    return this.searchAds('', title, category, city);
  }

  createAdvertisement(
    advertisementData: AdvertisementCreateData
  ): Observable<Boolean> {
    return this.http
      .post<ResponseData<Advertisement>>(BACKEND_URL, advertisementData, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          if (res.errors) {
            return false;
          } else {
            return res.data != null;
          }
        })
      );
  }

  private searchAds(
    userId: string,
    title: string,
    category: string,
    city: string
  ): Observable<Advertisement[]> {
    const params = { userId, title, category, city };
    console.log('searchAds(): requesting with ' + JSON.stringify(params));

    return this.http.get<Advertisement[]>(BACKEND_URL + '/search', {
      params,
      withCredentials: true,
    });
  }
}
