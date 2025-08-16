import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CombinationTemplateComponent } from './combination-template.component';

describe('CombinationTemplateComponent', () => {
  let component: CombinationTemplateComponent;
  let fixture: ComponentFixture<CombinationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinationTemplateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CombinationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
