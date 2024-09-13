import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebinarComponent } from './edit-webinar.component';

describe('EditWebinarComponent', () => {
  let component: EditWebinarComponent;
  let fixture: ComponentFixture<EditWebinarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWebinarComponent]
    });
    fixture = TestBed.createComponent(EditWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
