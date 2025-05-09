import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeEditFormComponent } from './resume-edit-form.component';

describe('ResumeEditFormComponent', () => {
  let component: ResumeEditFormComponent;
  let fixture: ComponentFixture<ResumeEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
