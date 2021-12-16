import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserGender } from 'src/app/model/user/user-gender';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;

  genders = UserGender.values;

  constructor() {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {}
}
