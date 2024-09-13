import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDateStudentWiseNoOfPracticesComponent } from './on-date-student-wise-no-of-practices.component';

describe('OnDateStudentWiseNoOfPracticesComponent', () => {
  let component: OnDateStudentWiseNoOfPracticesComponent;
  let fixture: ComponentFixture<OnDateStudentWiseNoOfPracticesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnDateStudentWiseNoOfPracticesComponent]
    });
    fixture = TestBed.createComponent(OnDateStudentWiseNoOfPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
