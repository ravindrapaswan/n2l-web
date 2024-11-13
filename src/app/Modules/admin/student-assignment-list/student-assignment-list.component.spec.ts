import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentListComponent } from './student-assignment-list.component';
describe('StudentAssignmentListComponent', () => {
  let component: StudentAssignmentListComponent;
  let fixture: ComponentFixture<StudentAssignmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAssignmentListComponent]
    });
    fixture = TestBed.createComponent(StudentAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
