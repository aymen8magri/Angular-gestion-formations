import { Component, inject } from '@angular/core';
import { Formation } from '../../../models/formation.model';
import { FormationService } from '../../../services/formation.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-formations',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './list-formations.component.html',
  styleUrl: './list-formations.component.css'
})
export class ListFormationsComponent {
  formations: Formation[] = [];
  formationService: FormationService = inject(FormationService);
  searchQuery: string = ''; // la mot de recherche

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


  applyFilters() {
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      this.formations = this.formations.filter((formation) => {
        return (
          formation.titre.toLowerCase().includes(query) ||
          formation.description.toLowerCase().includes(query)
        );
      });
    } else {
      // Recharger toutes les formations si la recherche est vide
      this.getFormations();
    }
  }
  

}
