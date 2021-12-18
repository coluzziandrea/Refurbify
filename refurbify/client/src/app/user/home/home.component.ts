import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdvertisementService } from 'src/app/advertisements/services/advertisement.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Advertisement } from '../../model/advertisement/advertisement.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  latestNearAdvertisements$!: Observable<Advertisement[]>;

  constructor(
    private advertisementService: AdvertisementService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reloadAdvertisements();
  }

  reloadAdvertisements() {
    this.latestNearAdvertisements$ = of([]);
  }
}
