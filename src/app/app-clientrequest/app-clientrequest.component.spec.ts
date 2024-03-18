import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppClientrequestComponent } from './app-clientrequest.component';

describe('AppClientrequestComponent', () => {
  let component: AppClientrequestComponent;
  let fixture: ComponentFixture<AppClientrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppClientrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppClientrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
