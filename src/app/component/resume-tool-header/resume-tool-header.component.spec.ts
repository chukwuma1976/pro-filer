import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeToolHeaderComponent } from './resume-tool-header.component';

describe('ResumeToolHeaderComponent', () => {
  let component: ResumeToolHeaderComponent;
  let fixture: ComponentFixture<ResumeToolHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeToolHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeToolHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
