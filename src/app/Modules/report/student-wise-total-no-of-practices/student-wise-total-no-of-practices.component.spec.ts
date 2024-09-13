import { ComponentFixture, TestBed } from '@angular/core/testing';


import { StudentWiseTotalNoOfPracticesComponent } from './student-wise-total-no-of-practices.component';

describe('StudentWiseTotalNoOfPracticesComponent', () => {
  let component: StudentWiseTotalNoOfPracticesComponent;
  let fixture: ComponentFixture<StudentWiseTotalNoOfPracticesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentWiseTotalNoOfPracticesComponent]
    });
    fixture = TestBed.createComponent(StudentWiseTotalNoOfPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
