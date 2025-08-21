import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueTemplateComponent } from './unique-template.component';

describe('UniqueTemplateComponent', () => {
  let component: UniqueTemplateComponent;
  let fixture: ComponentFixture<UniqueTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniqueTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniqueTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
