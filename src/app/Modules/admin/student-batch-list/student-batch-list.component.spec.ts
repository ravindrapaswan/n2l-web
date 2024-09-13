import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBatchListComponent } from './student-batch-list.component';

describe('StudentBatchListComponent', () => {
  let component: StudentBatchListComponent;
  let fixture: ComponentFixture<StudentBatchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentBatchListComponent]
    });
    fixture = TestBed.createComponent(StudentBatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
