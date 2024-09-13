import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWebinarComponent } from './create-webinar.component';

describe('CreateWebinarComponent', () => {
  let component: CreateWebinarComponent;
  let fixture: ComponentFixture<CreateWebinarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWebinarComponent]
    });
    fixture = TestBed.createComponent(CreateWebinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
