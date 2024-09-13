import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRecordComponent } from './student-record.component';

describe('StudentRecordComponent', () => {
  let component: StudentRecordComponent;
  let fixture: ComponentFixture<StudentRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRecordComponent]
    });
    fixture = TestBed.createComponent(StudentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
