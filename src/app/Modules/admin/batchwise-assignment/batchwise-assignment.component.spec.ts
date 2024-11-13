import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchwiseAssignmentComponent } from './batchwise-assignment.component';

describe('BatchwiseAssignmentComponent', () => {
  let component: BatchwiseAssignmentComponent;
  let fixture: ComponentFixture<BatchwiseAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatchwiseAssignmentComponent]
    });
    fixture = TestBed.createComponent(BatchwiseAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
