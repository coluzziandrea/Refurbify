import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;

  constructor() {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {}
}
