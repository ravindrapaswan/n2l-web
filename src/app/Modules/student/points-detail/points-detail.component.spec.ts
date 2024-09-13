import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsDetailComponent } from './points-detail.component';

describe('PointsDetailComponent', () => {
  let component: PointsDetailComponent;
  let fixture: ComponentFixture<PointsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointsDetailComponent]
    });
    fixture = TestBed.createComponent(PointsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
