import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Advertisement } from 'src/app/model/advertisement/advertisement.model';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent {
  @Input()
  advertisements!: Advertisement[];

  @Input()
  currentUser!: User;

  @Output()
  onDeleteAd = new EventEmitter<string>();

  onDeleteAdvertisement(advertisement: Advertisement) {
    this.onDeleteAd.emit(advertisement.id);
  }

  isCurrentUserAd(advertisement: Advertisement) {
    return this.currentUser.id == advertisement.userId;
  }
}
