import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditprofileComponent } from './app-editprofile.component';

describe('AppEditprofileComponent', () => {
  let component: AppEditprofileComponent;
  let fixture: ComponentFixture<AppEditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppEditprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
