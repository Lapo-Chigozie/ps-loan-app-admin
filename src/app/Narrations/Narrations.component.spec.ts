/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NarrationsComponent } from './Narrations.component';

describe('NarrationsComponent', () => {
  let component: NarrationsComponent;
  let fixture: ComponentFixture<NarrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
