import { Component } from '@angular/core';
import { FormationStagiaire } from '../../../models/FormationStagiaire.model';
import { FormationStagiaireService } from '../../../services/formation-stagiaire.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscriptions',
  standalone: true,
  imports: [],
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.css'
})
export class InscriptionsComponent {

  lesInscrits: FormationStagiaire[] = [];
  id: any;
  constructor(
    private formationStagiaireService: FormationStagiaireService,  // injecter le service FormationStagiaireService ici
    private route: ActivatedRoute

  ) { }
  ngOnInit() {
    // Récupérer l'ID de la formation depuis les paramètres de la route
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    // TODO: récupérer les inscriptions depuis le service
    this.formationStagiaireService.getStagiairesPaiementEffectue(this.id).subscribe((data: FormationStagiaire[]) => {
      this.lesInscrits = data;
      console.log(this.lesInscrits);
    });
  }
  /**
     * * Supprime une Inscription.
     */
  supprimerInscription(id: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action supprimera définitivement l\'Inscription.',
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
              text: 'La Inscription a été supprimée avec succès.',
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
              text: 'Échec de la suppression de l\'inscription.'
            });
          }
        );
      }
    });


  }
}

