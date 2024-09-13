import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummryReportComponent } from './summry-report.component';

describe('SummryReportComponent', () => {
  let component: SummryReportComponent;
  let fixture: ComponentFixture<SummryReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummryReportComponent]
    });
    fixture = TestBed.createComponent(SummryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
