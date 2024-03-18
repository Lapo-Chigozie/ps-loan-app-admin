import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNetpayComponent } from './upload-netpay.component';

describe('UploadNetpayComponent', () => {
  let component: UploadNetpayComponent;
  let fixture: ComponentFixture<UploadNetpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadNetpayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadNetpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
