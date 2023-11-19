import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ADVERTISEMENT_CATEGORIES } from 'src/app/model/advertisement/advertisement.category';
import { Advertisement } from 'src/app/model/advertisement/advertisement.model';
import { User } from 'src/app/model/user/user.model';
import { AdvertisementService } from '../services/advertisement.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  currentUser: User = this.authService.currentUser;
  categories = ADVERTISEMENT_CATEGORIES;
  resultAdvertisements: Advertisement[] = [];
  isLoading = false;

  @ViewChild(NgForm)
  searchForm!: NgForm;

  constructor(
    private authService: AuthService,
    private advertisementService: AdvertisementService
  ) {}

  onSearch() {
    let { title, category, city } = this.searchForm.value;

    if (category === 'all') {
      category = '';
    }

    this.isLoading = true;

    this.advertisementService
      .searchAdvertisements(title, category, city)
      .subscribe((res) => {
        this.isLoading = false;
        this.resultAdvertisements = res;
      });
  }

  onDeleteAdvertisement(adId: string) {
    this.advertisementService.deleteAdvertisement(adId).subscribe((res) => {
      if (res) {
        this.resultAdvertisements = this.resultAdvertisements.filter(
          (el) => el.id !== adId
        );
      }
    });
  }
}
