import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
    authService.getAuthStatusListener().subscribe((status) => {
      expect(status)
        .withContext('Signup has not changed service status')
        .toBeTruthy();

      done();
    });
    authService.signup(
      'user@example.com',
      'password',
      'Mario',
      new Date(),
      'maschio',
      'Rome'
    );

    const req = httpTestingController.expectOne('/api/users/signup');

    expect(req.request.method).toEqual('POST');
  });
});
