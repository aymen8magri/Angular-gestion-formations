import { Component, inject } from '@angular/core';
import { FormationService } from '../../../services/formation.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Formation } from '../../../models/formation.model';

@Component({
  selector: 'app-formation-by-entity',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './formation-by-entity.component.html',
  styleUrl: './formation-by-entity.component.css'
})
export class FormationByEntityComponent {
  formations: Formation[] = [];
  isEntreprise: boolean = false;
  id!: number;

  formationService: FormationService = inject(FormationService);
  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // Récupérer les paramètres dynamiques de l'URL
    this.route.params.subscribe(params => {
      if (params['entrepriseId']) {
        this.isEntreprise = true;
        this.id = +params['entrepriseId'];
        this.loadFormationsByEntrepriseId();
      } else if (params['formateurId']) {
        this.isEntreprise = false;
        this.id = +params['formateurId'];
        this.loadFormationsByFormateurId();
      }
    });
  }

  loadFormationsByEntrepriseId(): void {
    this.formationService.listerFormationsParEntreprise(this.id).subscribe(
      (data) => {
        this.formations = data;
        console.log('Formations récupérées:', this.formations);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadFormationsByFormateurId(): void {
    this.formationService.listerFormationsParFormateur(this.id).subscribe(
      (data) => {
        this.formations = data;
        console.log('Formations récupérées:', this.formations);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
