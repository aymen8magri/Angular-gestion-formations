import { Component, inject } from '@angular/core';
import { Formation } from '../../../models/formation.model';
import { FormationService } from '../../../services/formation.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-formations',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-formations.component.html',
  styleUrl: './list-formations.component.css'
})
export class ListFormationsComponent {
  formations: Formation[] = [];
  formationService: FormationService = inject(FormationService);

  ngOnInit() {
    this.getFormations();
  }

  // Récupérer toutes les formations
  getFormations(): void {
    this.formationService.listerFormations().subscribe(
      (data) => {
        this.formations = data;
        console.log('Formations récupérées:', this.formations);
      },
      (error) => {
        console.error('Erreur lors de la récupération des formations', error);
      }
    );
  }


}
