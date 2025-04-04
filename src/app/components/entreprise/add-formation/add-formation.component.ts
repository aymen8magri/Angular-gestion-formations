import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormationService } from '../../../services/formation.service';
import { FormateurService } from '../../../services/formateur.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Formation } from '../../../models/formation.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

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
  formationId: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private formationService: FormationService,
    private formateurService: FormateurService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router

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

    // Récupérer l'ID de l'URL
    this.route.paramMap.subscribe(params => {
      this.formationId = params.get('id');
      if (this.formationId) {
        this.loadFormationData(this.formationId);
      }
    });
  }

  // Charger les données de la formation à mettre à jour
  loadFormationData(id: any): void {
    this.formationService.consulterFormation(id).subscribe(formation => {
      if (formation) {
        // Remplir les champs simples
        this.formationForm.patchValue({
          titre: formation.titre,
          description: formation.description,
          dateDebut: formation.dateDebut,
          dateFin: formation.dateFin,
          nbrePlace: formation.nbrePlace,
          duree: formation.duree,
          prix: formation.prix,
          formateur: formation.formateur ? formation.formateur.id : '', // ✅ Assurez-vous d'envoyer l'ID
        });
        // Mettre à jour l'image
        this.image = formation.imageUrl;

        // Mettre à jour le tableau planning
        this.planning.clear(); // ✅ Supprime les anciens éléments avant d'ajouter les nouveaux
        if (formation.planning && Array.isArray(formation.planning)) {
          formation.planning.forEach((p: string) => {
            this.planning.push(this.fb.control(p));
          });
        }
      }
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
      formateur: { id: this.formationForm.value.formateur } as any,
      entreprise: { id: this.formationForm.value.entreprise } as any
    };
    if (this.formationId) {
      // ✅ Mettre à jour la formation existante
      this.formationService.modifierFormation(this.formationId, formationData, this.image).subscribe(response => {
        this.toastr.success(`La formation "${this.formationForm.value.titre}" a été mise à jour avec succès !`, 'Succès');
        this.router.navigate(['/entreprise/formations']);
        console.log('Formation mise à jour avec succès', response);
      }, error => {
        this.toastr.error("Une erreur s'est produite lors de la mise à jour.", "Erreur");
        console.error('Erreur lors de la mise à jour de la formation', error);
      });
    } else {
      // ✅ Ajouter une nouvelle formation
      this.formationService.ajouterFormation(formationData, this.image).subscribe(response => {
        this.toastr.success(`La formation "${this.formationForm.value.titre}" a été ajoutée avec succès !`, 'Succès');
        this.router.navigate(['/entreprise/formations']);
        console.log('Formation ajoutée avec succès', response);
      }, error => {
        this.toastr.error("Une erreur s'est produite lors de l'ajout.", "Erreur");
        console.error('Erreur lors de l\'ajout de la formation', error);
      });
    }
  }

}

