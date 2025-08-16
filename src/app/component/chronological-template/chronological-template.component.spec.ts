import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronologicalTemplateComponent } from './chronological-template.component';

describe('ChronologicalTemplateComponent', () => {
  let component: ChronologicalTemplateComponent;
  let fixture: ComponentFixture<ChronologicalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChronologicalTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChronologicalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
