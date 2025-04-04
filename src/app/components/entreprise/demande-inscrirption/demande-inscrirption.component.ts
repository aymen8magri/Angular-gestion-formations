import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationStagiaireService } from '../../../services/formation-stagiaire.service';

@Component({
  selector: 'app-demande-inscrirption',
  standalone: true,
  imports: [],
  templateUrl: './demande-inscrirption.component.html',
  styleUrl: './demande-inscrirption.component.css'
})
export class DemandeInscrirptionComponent {
  id:any;
  lesDemandesNonInscrits:any;

  constructor(
    private formationStagiaireService: FormationStagiaireService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.formationStagiaireService.getStagiairesPaiementNonEffectue(this.id).subscribe(
      (res) => {
        this.lesDemandesNonInscrits = res;
        console.log(this.lesDemandesNonInscrits);
      }
    );
  }
  //
  // !!!!!!!! sweat alert 
  //
  accepetDemande(id: number) {
    this.formationStagiaireService.modifierInscription(id, true).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit(); // Refresh the list after accepting the request
      },
      (error) => {
        console.error('Error accepting request:', error);
      }
    );
  }

}
