import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppClientMonthlyNetPaysComponent } from './app-client-monthly-net-pays.component';

describe('AppClientMonthlyNetPaysComponent', () => {
  let component: AppClientMonthlyNetPaysComponent;
  let fixture: ComponentFixture<AppClientMonthlyNetPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppClientMonthlyNetPaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppClientMonthlyNetPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
