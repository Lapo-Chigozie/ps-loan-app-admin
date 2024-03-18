import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddnewsfaffComponent } from './app-addnewsfaff.component';

describe('AppAddnewsfaffComponent', () => {
  let component: AppAddnewsfaffComponent;
  let fixture: ComponentFixture<AppAddnewsfaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAddnewsfaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAddnewsfaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
