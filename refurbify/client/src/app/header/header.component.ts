import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async, Observable, Subscriber, Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../model/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  currentUser!: User | null;
  private currentUserSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
  }

  ngOnInit(): void {
    this.currentUserSub = this.authService
      .getCurrentUserListener()
      .subscribe((user) => {
        console.log('Received new current user');
        this.userIsAuthenticated = user != null;
        this.currentUser = user;
      });

    this.authService.autoAuthUser();
  }

  onLogout() {
    this.authService.signout();

    this.router.navigate(['/home']);
  }
}
