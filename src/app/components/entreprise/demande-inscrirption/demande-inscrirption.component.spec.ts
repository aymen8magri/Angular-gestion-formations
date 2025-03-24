import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeInscrirptionComponent } from './demande-inscrirption.component';

describe('DemandeInscrirptionComponent', () => {
  let component: DemandeInscrirptionComponent;
  let fixture: ComponentFixture<DemandeInscrirptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeInscrirptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeInscrirptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
