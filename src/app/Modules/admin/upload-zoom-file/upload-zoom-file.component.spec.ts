import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadZoomFileComponent } from './upload-zoom-file.component';

describe('UploadZoomFileComponent', () => {
  let component: UploadZoomFileComponent;
  let fixture: ComponentFixture<UploadZoomFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadZoomFileComponent]
    });
    fixture = TestBed.createComponent(UploadZoomFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
