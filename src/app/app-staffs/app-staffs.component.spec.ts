import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStaffsComponent } from './app-staffs.component';

describe('AppStaffsComponent', () => {
  let component: AppStaffsComponent;
  let fixture: ComponentFixture<AppStaffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppStaffsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
