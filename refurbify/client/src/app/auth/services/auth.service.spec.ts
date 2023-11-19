import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SUCCESSFUL_SIGNUP_MOCK } from 'src/app/__mocks__/signup-mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should change status on successful signup', (done: DoneFn) => {
    console.log('Init test...');
    authService.getCurrentUserListener().subscribe((user) => {
      console.log('User received: ' + user);
      expect(user)
        .withContext('Signup has not changed service status')
        .toBeTruthy();

      done();
    });

    console.log('calling signup...');
    authService.signup(
      'user@example.com',
      'password',
      'Mario',
      new Date(),
      'maschio',
      'Rome'
    );

    console.log('testing httpController...');
    const req = httpTestingController.expectOne('/api/users/signup');

    console.log('testing method...');
    expect(req.request.method).toEqual('POST');

    req.flush(SUCCESSFUL_SIGNUP_MOCK);
  });
});
