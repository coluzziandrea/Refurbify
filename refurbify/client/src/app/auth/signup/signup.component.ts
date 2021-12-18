import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserGender } from 'src/app/model/user/user-gender';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;

  authStatusSub!: Subscription;

  genders = UserGender.values;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/user/home']);
      });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signup(
      form.value.email,
      form.value.password,
      form.value.name,
      form.value.birthDate,
      form.value.gender,
      form.value.city
    );
  }
}
