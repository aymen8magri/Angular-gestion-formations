import { Component, inject } from '@angular/core';
import { FormateurService } from '../../../services/formateur.service';
import { Formateur } from '../../../models/Formateur.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formateurs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './formateurs.component.html',
  styleUrl: './formateurs.component.css'
})
export class FormateursComponent {
  formateurService: FormateurService = inject (FormateurService);
  formateurs: Formateur[] = [];

  ngOnInit() {
    this.listerFormateurs();
  }

  // Get all formateurs
  listerFormateurs() {
    this.formateurService.listerFormateurs().subscribe(
      (data) => {
        this.formateurs = data;
        console.log('Formateurs récupérés:', this.formateurs);
      },
      (error) => {
        console.error('Erreur lors de la récupération des formateurs', error);
      }
    );
  }
}
