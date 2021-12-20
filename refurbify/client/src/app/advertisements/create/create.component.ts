import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertisementCreateData } from 'src/app/model/advertisement/advertisement.create.model';
import { User } from 'src/app/model/user/user.model';
import { ADVERTISEMENT_CATEGORIES } from '../../model/advertisement/advertisement.category';
import { AdvertisementService } from '../services/advertisement.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  isLoading = false;
  categories = ADVERTISEMENT_CATEGORIES;

  formError?: string;

  @Input()
  currentUser!: User;

  @ViewChild(NgForm)
  adForm!: NgForm;

  constructor(
    private advertisementService: AdvertisementService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('onSubmit(): init...');

    if (!this.adForm.valid) {
      console.log('onSubmit(): form is not valid, returning');
      return;
    }

    console.log('onSubmit(): currentUser: ' + this.currentUser);

    this.isLoading = true;

    const createData: AdvertisementCreateData = {
      userId: this.currentUser.id,
      userEmail: this.currentUser.email,
      userCity: this.currentUser.city,
      userName: this.currentUser.name,
      category: this.adForm.controls['category'].value,
      title: this.adForm.controls['title'].value,
      description: this.adForm.controls['description'].value,
      price: this.adForm.controls['price'].value,
      createdAt: new Date().getTime(),
    };

    console.log('onSubmit(): calling advertisementService...');
    const observable =
      this.advertisementService.createAdvertisement(createData);

    console.log('onSubmit(): subscribing to observable return...');
    observable.subscribe((res) => {
      this.isLoading = false;
      console.log('onSubmit(): received response: ' + res);

      if (res) {
        this.router.navigate(['/user/my-advertisements']);
      } else {
        this.formError = 'Impossibile completare operazione, riprova più tardi';
      }
    });
  }
}
