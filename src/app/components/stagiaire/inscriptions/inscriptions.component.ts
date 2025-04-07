import { Component } from '@angular/core';
import { FormationStagiaire } from '../../../models/FormationStagiaire.model';
import { FormationStagiaireService } from '../../../services/formation-stagiaire.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscriptions',
  standalone: true,
  imports: [],
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.css'
})
export class InscriptionsComponent {
  listFormationEnAttente: FormationStagiaire[] = [];

  constructor(
    private formationStagiaireService: FormationStagiaireService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getInscriptionsEnAttente();
  }
  getInscriptionsEnAttente() {
    this.formationStagiaireService.getFormationsInscritesByStagiaireAndPaiementNonEffectue(this.authService.getUserIdFromToken()).subscribe(
      (data) => {
        this.listFormationEnAttente = data;
        console.log('Mes formations récupérées:', this.listFormationEnAttente);
      },
      (error) => {
        console.error('Erreur lors de la récupération des formations:', error);
      }
    );
  }

  /**
     * * Supprime une demande d'inscription.
     */
  supprimerInscription(id: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action supprimera définitivement la demande.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formationStagiaireService.supprimerInscription(id).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Supprimée',
              text: 'La demande a été supprimée avec succès.',
              timer: 1500,
              showConfirmButton: false
            });
            // Mets à jour la liste (reload ou filtre localement)
            this.ngOnInit();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Échec de la suppression de la demande.'
            });
          }
        );
      }
    });


  }

}
