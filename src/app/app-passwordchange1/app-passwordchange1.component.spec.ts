import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPasswordchange1Component } from './app-passwordchange1.component';

describe('AppPasswordchange1Component', () => {
  let component: AppPasswordchange1Component;
  let fixture: ComponentFixture<AppPasswordchange1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPasswordchange1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPasswordchange1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
