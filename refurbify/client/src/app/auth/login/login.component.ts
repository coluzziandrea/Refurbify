import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;

  authStatusSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getCurrentUserListener()
      .subscribe((user) => {
        console.log('Authentication status changed: ' + user);
        this.isLoading = false;
        if (user) {
          this.router.navigate(['/user/home']);
        }
      });
  }

  onLogin(form: NgForm) {
    console.log('onLogin called');
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signin(form.value.email, form.value.password);
  }
}
