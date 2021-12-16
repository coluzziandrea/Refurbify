import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserGender } from 'src/app/model/user/user-gender';
import { AuthService } from '../auth.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;

  authStatusSub!: Subscription;

  genders = UserGender.values;

  constructor(private authService: AuthService) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signup(form.value.email, form.value.password);
  }
}
