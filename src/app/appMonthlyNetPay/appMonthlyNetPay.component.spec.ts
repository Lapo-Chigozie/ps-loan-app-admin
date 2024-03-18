/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppMonthlyNetPayComponent } from './appMonthlyNetPay.component';

describe('AppMonthlyNetPayComponent', () => {
  let component: AppMonthlyNetPayComponent;
  let fixture: ComponentFixture<AppMonthlyNetPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMonthlyNetPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMonthlyNetPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
