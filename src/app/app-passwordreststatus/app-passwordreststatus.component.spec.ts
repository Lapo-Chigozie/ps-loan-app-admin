import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPasswordreststatusComponent } from './app-passwordreststatus.component';

describe('AppPasswordreststatusComponent', () => {
  let component: AppPasswordreststatusComponent;
  let fixture: ComponentFixture<AppPasswordreststatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPasswordreststatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPasswordreststatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
