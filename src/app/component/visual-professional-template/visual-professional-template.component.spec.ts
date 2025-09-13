import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualProfessionalTemplateComponent } from './visual-professional-template.component';

describe('VisualProfessionalTemplateComponent', () => {
  let component: VisualProfessionalTemplateComponent;
  let fixture: ComponentFixture<VisualProfessionalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualProfessionalTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualProfessionalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
