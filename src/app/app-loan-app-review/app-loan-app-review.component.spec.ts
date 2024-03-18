import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoanAppReviewComponent } from './app-loan-app-review.component';

describe('AppLoanAppReviewComponent', () => {
  let component: AppLoanAppReviewComponent;
  let fixture: ComponentFixture<AppLoanAppReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLoanAppReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLoanAppReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
