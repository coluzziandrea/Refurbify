import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/model/advertisement/advertisement.model';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent implements OnInit {
  @Input()
  advertisements!: Advertisement[];

  @Input()
  currentUser!: User;

  constructor() {}

  ngOnInit(): void {}

  onEditAdvertisement(advertisement: Advertisement) {}

  onDeleteAdvertisement(advertisement: Advertisement) {}

  isCurrentUserAd(advertisement: Advertisement) {
    return this.currentUser.id == advertisement.userId;
  }
}
