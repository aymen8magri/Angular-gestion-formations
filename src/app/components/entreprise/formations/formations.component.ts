import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Formation } from '../../../models/formation.model';
import { AuthService } from '../../../services/auth.service';
import { FormationService } from '../../../services/formation.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [NgbModule, RouterModule],
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.css'
})
export class FormationsComponent {
  formations: Formation[] = [];
  id!: number;

  constructor(
    private authSevice: AuthService,
    private formationService: FormationService,
  ) { }

  ngOnInit() {
    this.id = this.authSevice.getUserIdFromToken()
    this.loadFormations();
  }

  loadFormations(): void {
    this.formationService.listerFormationsParEntreprise(this.id).subscribe((formations: Formation[]) => {
      this.formations = formations;
      console.log('Formations récupérées:', this.formations);
    });
  }


  supprimerFormation(id: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formationService.supprimerFormation(id).subscribe(() => {
          Swal.fire(
            'Supprimé !',
            'La formation a été supprimée avec succès.',
            'success'
          );
          // Rediriger ou rafraîchir la liste après suppression
          this.loadFormations();

        }, error => {
          Swal.fire(
            'Erreur !',
            'Impossible de supprimer la formation.',
            'error'
          );
          console.error(error);
        });
      }
    });
  }


}
