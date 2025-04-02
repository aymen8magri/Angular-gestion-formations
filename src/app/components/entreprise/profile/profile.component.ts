import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrepriseService } from '../../../services/entreprise.service';
import { AuthService } from '../../../services/auth.service';
import { Entreprise } from '../../../models/entreprise.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  entreprise: any;
  entrepriseForm!: FormGroup;
  entrepriseId!: any;

  image: any;

  constructor(private route: Router,
    private entrepriseService: EntrepriseService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    //initialiser le form
    this.entrepriseForm = this.fb.group({
      nom: ['', [Validators.minLength(3)]],
      email: ['', [Validators.email]],
      telephone: ['', [Validators.pattern('^(\\+216\\s?\\d{2}\\s?\\d{3}\\s?\\d{3}|\\d{8})$')]],
      password: ['', [Validators.minLength(6)]],
      adresse: this.fb.group({
        rue: ['', [Validators.minLength(3)]],
        ville: ['', [Validators.minLength(3)]],
        codePostal: ['', [Validators.minLength(4)]],
        pays: ['', [Validators.minLength(3)]]
      })

    });


    //get le data de entreprise loged in
    this.entrepriseId = this.authService.getUserIdFromToken();
    this.entrepriseService.getEntrepriseById(this.entrepriseId).subscribe({
      next: (res) => {
        this.entreprise = res;
        // Remplir les champs principaux
        this.entrepriseForm.patchValue({
          nom: res.nom,
          email: res.email,
          password: '', // Assure-toi de ne pas remplir le mot de passe
          telephone: res.telephone,

        });
        // Remplir les champs de l'adresse
        console.log(res.adresse)
        this.entrepriseForm.get('adresse')?.reset(res.adresse)
      }
    })
  }


  selectImage(e: any) {
    this.image = e.target.files[0];
  }

  onSubmit(): void {
    let entrepriseData: Entreprise = {
      nom: this.entrepriseForm.value.nom,
      email: this.entrepriseForm.value.email,
      telephone: this.entrepriseForm.value.telephone,
      adresse: {
        rue: this.entrepriseForm.value.adresse.rue,
        ville: this.entrepriseForm.value.adresse.ville,
        codePostal: this.entrepriseForm.value.adresse.codePostal,
        pays: this.entrepriseForm.value.adresse.pays
      }
    };

    // Ajouter le mot de passe seulement s'il est fourni
    if (this.entrepriseForm.value.password) {
      entrepriseData.password = this.entrepriseForm.value.password;
    }

    // Appel du service avec l'objet JSON + fichier
    this.entrepriseService.modifierEntreprise(this.entrepriseId, entrepriseData, this.image).subscribe({
      next: (res) => {
        console.log('Entreprise mise à jour avec succès', res);
        this.toastr.success('Mise à jour réussie !', 'Succès');

        // Attendre 2 secondes avant de recharger la page
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
      }
    });
  }




}
