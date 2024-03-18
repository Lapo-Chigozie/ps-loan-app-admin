import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProfiledComponent } from './app-profiled.component';

describe('AppProfiledComponent', () => {
  let component: AppProfiledComponent;
  let fixture: ComponentFixture<AppProfiledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppProfiledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppProfiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
