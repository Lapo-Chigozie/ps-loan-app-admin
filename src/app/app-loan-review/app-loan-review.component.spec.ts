import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoanReviewComponent } from './app-loan-review.component';

describe('AppLoanReviewComponent', () => {
  let component: AppLoanReviewComponent;
  let fixture: ComponentFixture<AppLoanReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLoanReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLoanReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
