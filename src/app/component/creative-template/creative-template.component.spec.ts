import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeTemplateComponent } from './creative-template.component';

describe('CreativeTemplateComponent', () => {
  let component: CreativeTemplateComponent;
  let fixture: ComponentFixture<CreativeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreativeTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreativeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
