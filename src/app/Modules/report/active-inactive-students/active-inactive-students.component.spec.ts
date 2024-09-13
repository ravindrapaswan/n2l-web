import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveInactiveStudentsComponent } from './active-inactive-students.component';

describe('ActiveInactiveStudentsComponent', () => {
  let component: ActiveInactiveStudentsComponent;
  let fixture: ComponentFixture<ActiveInactiveStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveInactiveStudentsComponent]
    });
    fixture = TestBed.createComponent(ActiveInactiveStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
