import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkStudentRegisterComponent } from './bulk-student-register.component';

describe('BulkStudentRegisterComponent', () => {
  let component: BulkStudentRegisterComponent;
  let fixture: ComponentFixture<BulkStudentRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkStudentRegisterComponent]
    });
    fixture = TestBed.createComponent(BulkStudentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
