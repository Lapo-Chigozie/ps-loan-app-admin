import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPasswordchangeComponent } from './app-passwordchange.component';

describe('AppPasswordchangeComponent', () => {
  let component: AppPasswordchangeComponent;
  let fixture: ComponentFixture<AppPasswordchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPasswordchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPasswordchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
