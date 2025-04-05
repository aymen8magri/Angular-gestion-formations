import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationStagiaireService } from '../../../services/formation-stagiaire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-inscrirption',
  standalone: true,
  imports: [],
  templateUrl: './demande-inscrirption.component.html',
  styleUrl: './demande-inscrirption.component.css'
})
export class DemandeInscrirptionComponent {
  id: any;
  lesDemandesNonInscrits: any;

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
  /**
   * accepte une demande d'inscription.
   */
  accepteDemande(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous allez accepter cette demande.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, accepter',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formationStagiaireService.modifierInscription(id, true).subscribe(
          (res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Demande acceptée',
              showConfirmButton: false,
              timer: 1500
            });
            this.ngOnInit(); // Refresh the list
          },
          (error) => {
            console.error('Error accepting request:', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de l’acceptation.'
            });
          }
        );
      }
    });
  }

  /**
   * * Supprime une demande d'inscription.
   */
  supprimerDemande(id: number): void {
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
