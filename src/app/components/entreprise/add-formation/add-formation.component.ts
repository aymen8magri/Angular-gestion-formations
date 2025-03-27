import { Component } from '@angular/core';

@Component({
  selector: 'app-add-formation',
  standalone: true,
  imports: [],
  templateUrl: './add-formation.component.html',
  styleUrl: './add-formation.component.css'
})
export class AddFormationComponent {
  formation = {
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    nbrePlace: 0,
    duree: 0,
    prix: 0,
    planning: [''], // Initialisez avec un premier champ vide
    formateur: null,
    entreprise: null,
    imageUrl: ''
  };

  // Fonction pour ajouter un nouvel élément de planning
  addPlanning(): void {
    this.formation.planning.push(''); // Ajouter un nouvel élément vide dans le tableau planning
  }
}
