import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditWebinarComponent } from './dialog-edit-webinar.component';

describe('DialogEditWebinarComponent', () => {
  let component: DialogEditWebinarComponent;
  let fixture: ComponentFixture<DialogEditWebinarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditWebinarComponent]
    });
    fixture = TestBed.createComponent(DialogEditWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
