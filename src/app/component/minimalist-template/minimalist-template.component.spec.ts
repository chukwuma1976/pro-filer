import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalistTemplateComponent } from './minimalist-template.component';

describe('MinimalistTemplateComponent', () => {
  let component: MinimalistTemplateComponent;
  let fixture: ComponentFixture<MinimalistTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalistTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimalistTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
