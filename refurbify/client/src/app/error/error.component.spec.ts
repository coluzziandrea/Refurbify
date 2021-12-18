import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from '../app.module';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AppModule, NoopAnimationsModule],
        providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(ErrorComponent);
          component = fixture.componentInstance;
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
