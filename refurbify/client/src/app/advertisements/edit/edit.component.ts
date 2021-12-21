import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ADVERTISEMENT_CATEGORIES } from 'src/app/model/advertisement/advertisement.category';
import { AdvertisementService } from '../services/advertisement.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  isLoading = false;
  categories = ADVERTISEMENT_CATEGORIES;

  formError?: string;

  @ViewChild(NgForm)
  adForm!: NgForm;

  constructor(
    private advertisementService: AdvertisementService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.advertisementService
      .getAdvertisement(this.activatedRoute.snapshot.params['id'])
      .subscribe((ad) => {
        if (ad && this.adForm) {
          this.adForm.value.title = ad.title;
          this.adForm.value.category = ad.category.toLowerCase();
          this.adForm.value.description = ad.description;
          this.adForm.value.price = ad.price;
        }
      });
  }

  onSubmit() {
    if (!this.adForm.valid) {
      console.log('onSubmit(): form is not valid, returning');
      return;
    }

    this.isLoading = true;

    const observable = this.advertisementService.updateAdvertisement(
      this.activatedRoute.snapshot.params['id'],
      this.adForm.value.title,
      this.adForm.value.description,
      this.adForm.value.price,
      this.adForm.value.category
    );

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
