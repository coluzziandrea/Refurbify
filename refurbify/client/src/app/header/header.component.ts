import { Component, Input, OnInit } from '@angular/core';
import { async, Observable, Subscriber, Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../model/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  currentUser!: User | null;
  private currentUserSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSub = this.authService
      .getCurrentUserListener()
      .subscribe((user) => {
        this.userIsAuthenticated = user != null;
        this.currentUser = user;
      });
  }
}
