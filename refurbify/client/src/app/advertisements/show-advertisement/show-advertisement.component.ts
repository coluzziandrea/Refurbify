import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Advertisement } from 'src/app/model/advertisement/advertisement.model';
import { AdvertisementService } from '../services/advertisement.service';

@Component({
  selector: 'app-show-advertisement',
  templateUrl: './show-advertisement.component.html',
  styleUrls: ['./show-advertisement.component.scss'],
})
export class ShowAdvertisementComponent implements OnInit {
  advertisement!: Advertisement;

  constructor(
    private advertisementService: AdvertisementService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.advertisementService
      .getAdvertisement(this.activatedRoute.snapshot.params['id'])
      .subscribe((ad) => {
        if (ad) {
          this.advertisement = ad;
        }
      });
  }
}
