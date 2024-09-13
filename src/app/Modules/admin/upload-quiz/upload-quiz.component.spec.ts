import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadQuizComponent } from './upload-quiz.component';

describe('UploadQuizComponent', () => {
  let component: UploadQuizComponent;
  let fixture: ComponentFixture<UploadQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadQuizComponent]
    });
    fixture = TestBed.createComponent(UploadQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
