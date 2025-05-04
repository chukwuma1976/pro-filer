import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResumesComponent } from './user-resumes.component';

describe('UserResumesComponent', () => {
  let component: UserResumesComponent;
  let fixture: ComponentFixture<UserResumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserResumesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
