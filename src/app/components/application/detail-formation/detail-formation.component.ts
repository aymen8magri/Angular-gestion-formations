import { Component, inject } from '@angular/core';
import { FormationService } from '../../../services/formation.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-detail-formation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detail-formation.component.html',
  styleUrl: './detail-formation.component.css'
})
export class DetailFormationComponent {
  id:any;
  formation:any;

  readonly formationService: FormationService = inject(FormationService);
  readonly act: ActivatedRoute = inject(ActivatedRoute);
  authService: AuthService = inject(AuthService);
  ngOnInit() {
    this.id = this.act.snapshot.params['id'];
    this.chargerFormation();

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

}
