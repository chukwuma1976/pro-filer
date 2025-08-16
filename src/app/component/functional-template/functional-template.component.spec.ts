import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalTemplateComponent } from './functional-template.component';

describe('FunctionalTemplateComponent', () => {
  let component: FunctionalTemplateComponent;
  let fixture: ComponentFixture<FunctionalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionalTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
