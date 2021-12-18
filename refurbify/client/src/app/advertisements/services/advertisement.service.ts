import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.advertisementApiUrl;

@Injectable({ providedIn: 'root' })
export class AdvertisementService {
  findNearAdvertisements(
    arg0: any
  ): import('rxjs').Observable<
    import('../../model/advertisement/advertisement.model').Advertisement[]
  > {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
}
