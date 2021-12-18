import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthData } from '../../model/user/auth-data.model';
import { ResponseData } from 'src/app/model/response-data.model';
import { SignupData } from 'src/app/model/user/signup-data.model';
import { User } from 'src/app/model/user/user.model';
const BACKEND_URL = environment.authApiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private userId!: string;

  constructor(private http: HttpClient) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signin(email: any, password: any) {
    console.log('signin called');
    const authData: AuthData = { email: email, password: password };

    const url = BACKEND_URL + '/signin';
    console.log('executing request vs backend: ' + url);
    this.http.post<ResponseData<User>>(url, authData).subscribe({
      next: (response) => {
        console.log(response);

        if (response.body) {
          this.userId = response.body?.id;
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
          this.authStatusListener.next(false);
        }
      },
      error: (error) => {
        console.error(error);
        this.authStatusListener.next(false);
      },
    });
  }

  signup(
    email: string,
    password: string,
    name: string,
    birthDate: Date,
    gender: string,
    city: string
  ) {
    const signupData: SignupData = {
      email,
      password,
      name,
      birthDate: birthDate.getTime(),
      gender,
      city,
    };
    const url = BACKEND_URL + '/signup';

    this.http.post<ResponseData<User>>(url, signupData).subscribe({
      next: (response) => {
        console.log(response);

        if (response.body) {
          this.userId = response.body?.id;
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
          this.authStatusListener.next(false);
        }
      },
      error: (error) => {
        console.error(error);
        this.authStatusListener.next(false);
      },
    });
  }
}
