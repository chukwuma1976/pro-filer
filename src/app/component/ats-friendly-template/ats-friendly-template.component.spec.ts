import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ATSFriendlyTemplateComponent } from './ats-friendly-template.component';

describe('ATSFriendlyTemplateComponent', () => {
  let component: ATSFriendlyTemplateComponent;
  let fixture: ComponentFixture<ATSFriendlyTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ATSFriendlyTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ATSFriendlyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
