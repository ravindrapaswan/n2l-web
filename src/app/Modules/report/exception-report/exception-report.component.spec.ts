import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionReportComponent } from './exception-report.component';

describe('ExceptionReportComponent', () => {
  let component: ExceptionReportComponent;
  let fixture: ComponentFixture<ExceptionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExceptionReportComponent]
    });
    fixture = TestBed.createComponent(ExceptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
