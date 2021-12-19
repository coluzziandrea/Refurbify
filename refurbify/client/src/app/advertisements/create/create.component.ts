import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

    console.log(JSON.stringify(this.adForm.value));

    if (!this.adForm.valid) {
      console.log('onSubmit(): form is not valid, returning');
      return;
    }

    this.isLoading = true;
    console.log('onSubmit(): calling advertisementService...');
    const observable = this.advertisementService.createAdvertisement();

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
