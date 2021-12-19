import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ADVERTISEMENT_CATEGORIES } from '../../model/advertisement/advertisement.category';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  isLoading = false;

  categories = ADVERTISEMENT_CATEGORIES;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(adForm: NgForm) {}
}
