import { Component } from '@angular/core';
import { FormationStagiaireService } from '../../../services/formation-stagiaire.service';
import { AuthService } from '../../../services/auth.service';
import { FormationStagiaire } from '../../../models/FormationStagiaire.model';

@Component({
  selector: 'app-mes-formations',
  standalone: true,
  imports: [],
  templateUrl: './mes-formations.component.html',
  styleUrl: './mes-formations.component.css'
})
export class MesFormationsComponent {
  mesFormations: FormationStagiaire[] = [];

  constructor(
    private formationStagiaireService: FormationStagiaireService,
    private authService: AuthService  // ✅ Ajout de la dépendance AuthService
  ) { }

  ngOnInit() {
    this.getMesFormations();
  }
  getMesFormations() {
    this.formationStagiaireService.getFormationsInscritesByStagiaire(this.authService.getUserIdFromToken()).subscribe(
      (data) => {
        this.mesFormations = data;
        console.log('Mes formations récupérées:', this.mesFormations);
      },
      (error) => {
        console.error('Erreur lors de la récupération des formations:', error);
      }
    );
  }
}