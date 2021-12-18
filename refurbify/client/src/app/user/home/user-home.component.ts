import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AdvertisementService } from 'src/app/advertisements/services/advertisement.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/model/user/user.model';
import { Advertisement } from '../../model/advertisement/advertisement.model';

@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  latestNearAdvertisements!: Advertisement[];
  currentUser!: User;

  constructor(
    private advertisementService: AdvertisementService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserListener().subscribe((user) => {
      if (user != null) {
        console.log('User is currently logged, retrieving advertisements');
        this.advertisementService
          .findNearAdvertisements(user)
          .subscribe((ads) => {
            console.log('Found advertisements: ' + ads.length);
            this.latestNearAdvertisements = ads;
            this.currentUser = user;
          });
      } else {
        this.latestNearAdvertisements = [];
      }
    });
    this.authService.autoAuthUser();
  }
}
