import { Component, inject } from '@angular/core';
import { Entreprise } from '../../../models/entreprise.model';
import { EntrepriseService } from '../../../services/entreprise.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-entreprises',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './entreprises.component.html',
  styleUrl: './entreprises.component.css'
})
export class EntreprisesComponent {
  entreprises: Entreprise[] = [];
  entrepriseService: EntrepriseService = inject(EntrepriseService);

  ngOnInit() {
    this.getEntreprises();
  }

   // Récupérer toutes les entreprises
   getEntreprises(): void {
    this.entrepriseService.getAllEntreprises().subscribe(
      (data) => {
        this.entreprises = data;
        console.log('Entreprises récupérées:', this.entreprises);
      },
      (error) => {
        console.error('Erreur lors de la récupération des entreprises', error);
      }
    );
  }
}
