import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationByEntityComponent } from './formation-by-entity.component';

describe('FormationByEntityComponent', () => {
  let component: FormationByEntityComponent;
  let fixture: ComponentFixture<FormationByEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationByEntityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationByEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
