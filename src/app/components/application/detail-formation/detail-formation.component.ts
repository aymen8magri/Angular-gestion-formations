import { Component, inject } from '@angular/core';
import { FormationService } from '../../../services/formation.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormationStagiaireService } from '../../../services/formation-stagiaire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-formation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detail-formation.component.html',
  styleUrl: './detail-formation.component.css'
})
export class DetailFormationComponent {
  id: any;
  formation: any;
  hideInscriptionButton : boolean = false;

  readonly formationService: FormationService = inject(FormationService);
  readonly act: ActivatedRoute = inject(ActivatedRoute);
  authService: AuthService = inject(AuthService);
  formationStagiaireService: FormationStagiaireService = inject(FormationStagiaireService);

  ngOnInit() {
    this.id = this.act.snapshot.params['id'];
    this.chargerFormation();
    this.verifierInscription();

    console.log(this.authService.getRoleFromToken());
  }

  // Récupérer une formation
  chargerFormation(): void {
    this.formationService.consulterFormation(this.id).subscribe(
      (data) => {
        this.formation = data;
        console.log('Formation récupérée:', this.formation);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la formation', error);
      }
    );
  }

  // Vérifier si l'utilisateur est déjà inscrit
  verifierInscription(): void {
    const stagiaireId = this.authService.getUserIdFromToken();
    this.formationStagiaireService.estInscrit(stagiaireId, this.id).subscribe(
      (isInscrit) => {
        if (isInscrit) {
          // Si l'inscription existe, masquer le bouton d'inscription
          this.hideInscriptionButton = true;
        } else {
          this.hideInscriptionButton = false;
        }
      },
      (error) => {
  console.error('Erreur lors de la vérification de l\'inscription', error);
}
    );
  }

// Inscription à une formation
inscrireFormation(): void {
  const stagiaireId = this.authService.getUserIdFromToken();
  this.formationStagiaireService.inscrireStagiaire(this.id, stagiaireId).subscribe(
    (response) => {
      console.log('Inscription réussie:', response);
      Swal.fire({
        icon: 'success',
        title: 'Demande envoyée avec succès',
        text: 'Votre demande d\'inscription a été envoyée. Vous devez attendre la confirmation de l\'administrateur.',
        confirmButtonText: 'OK'
      });
      this.verifierInscription();

    },
    (error) => {
      console.error('Erreur lors de l\'inscription à la formation', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur lors de l\'inscription',
        text: 'Une erreur est survenue lors de l\'inscription à la formation. Veuillez réessayer plus tard.',
        confirmButtonText: 'OK'
      });
    }
  );
}

}
