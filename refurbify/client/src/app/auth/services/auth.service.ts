import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthData } from '../../model/user/auth-data.model';

const BACKEND_URL = environment.authApiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private token!: string;
  private userId!: string;

  constructor(private http: HttpClient, private router: Router) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  signup(
    email: any,
    password: any,
    name: any,
    birthDate: any,
    gender: any,
    city: any
  ) {
    const authData: AuthData = { email: email, password: password };

    this.http
      .post<{ token: string; userId: string }>(
        BACKEND_URL + '/signup',
        authData
      )
      .subscribe({
        next: (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.authStatusListener.next(false);
        },
      });
  }
}
