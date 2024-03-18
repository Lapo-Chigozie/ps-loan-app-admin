import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppClientsComponent } from './app-clients.component';

describe('AppClientsComponent', () => {
  let component: AppClientsComponent;
  let fixture: ComponentFixture<AppClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
