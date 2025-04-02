import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormationService } from '../../../services/formation.service';
import { FormateurService } from '../../../services/formateur.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Formation } from '../../../models/formation.model';

@Component({
  selector: 'app-add-formation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-formation.component.html',
  styleUrl: './add-formation.component.css'
})
export class AddFormationComponent {
  formationForm!: FormGroup;
  listFormateurs: any[] = [];
  image: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private formationService: FormationService,
    private formateurService: FormateurService
  ) { }

  ngOnInit(): void {
    // Initialiser le formulaire
    this.formationForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      nbrePlace: [0, [Validators.required, Validators.min(1)]],
      duree: [0, [Validators.required, Validators.min(1)]],
      prix: [0, [Validators.required, Validators.min(1)]],
      planning: this.fb.array([]),
      formateur: ['', Validators.required],
      entreprise: [this.authService.getUserIdFromToken()]
    });

    // Charger les formateurs
    this.formateurService.listerFormateurs().subscribe((res) => {
      this.listFormateurs = res;
    });
  }

  // Getter pour accéder au tableau planning
  get planning(): FormArray {
    return this.formationForm.get('planning') as FormArray;
  }

  // Ajouter un champ planning
  addPlanning(): void {
    this.planning.push(this.fb.control(''));
  }
  selectImage(e: any) {
    this.image = e.target.files[0];
  }
  // Soumettre le formulaire
  onSubmit(): void {
    let formationData: Formation = {
      titre: this.formationForm.value.titre,
      description: this.formationForm.value.description,
      dateDebut: this.formationForm.value.dateDebut,
      dateFin: this.formationForm.value.dateFin,
      nbrePlace: this.formationForm.value.nbrePlace,
      duree: this.formationForm.value.duree,
      prix: this.formationForm.value.prix,
      planning: this.formationForm.value.planning,
      formateur: { id: this.formationForm.value.formateur },  // ✅ Correction ici
      entreprise: { id: this.formationForm.value.entreprise }  // ✅ Correction ici
    }
    this.formationService.ajouterFormation(formationData, this.image).subscribe(response => {
      console.log('Formation ajoutée avec succès', response);
    }, error => {
      console.log('Erreur lors de l\'ajout de la formation', error);
    });

  }

}

