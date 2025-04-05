import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StagiaireService } from '../../../services/stagiaire.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Stagiaire } from '../../../models/Stagiaire.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  stagiaire: any;
  stagiaireForm: any;
  stagiaireId: any;
  image: any;

  constructor(
    private route: Router,
    private StagiaireService: StagiaireService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    //initialize le form
    this.stagiaireForm = this.fb.group({
      nom: ['', Validators.minLength(3)],
      prenom: ['', Validators.minLength(3)],
      email: ['', Validators.email],
      telephone: ['', [Validators.pattern('^(\\+216\\s?\\d{2}\\s?\\d{3}\\s?\\d{3}|\\d{8})$')]],
      password: ['', [Validators.minLength(6)]],
      dateNaissance: ['']
    });

    //get le data de stagiaire loged in
    this.stagiaireId = this.authService.getUserIdFromToken();
    this.StagiaireService.getStagiaireById(this.stagiaireId).subscribe({
      next: (res) => {
        this.stagiaire = res;
        // Remplir les champs principaux
        this.stagiaireForm.patchValue({
          nom: res.nom,
          prenom: res.prenom,
          email: res.email,
          telephone: res.telephone,
          password: '', // Assure-toi de ne pas remplir le mot de passe
          dateNaissance: res.dateNaissance
        });
      }
    });
  }


  selectImage(e: any) {
    this.image = e.target.files[0];
  }
  updateProfile() {
    let stagiaireData: Stagiaire = {
      nom: this.stagiaireForm.value.nom,
      prenom: this.stagiaireForm.value.prenom,
      email: this.stagiaireForm.value.email,
      telephone: this.stagiaireForm.value.telephone,
      dateNaissance: this.stagiaireForm.value.dateNaissance
    };

    //ajouter le mot de passe seulement si il est modifié
    if (this.stagiaireForm.value.password) {
      stagiaireData.password = this.stagiaireForm.value.password;
    }

    //appel du service pour update le stagiaire 
    this.StagiaireService.modifierStagiaire(this.stagiaireId, stagiaireData, this.image).subscribe({
      next: (res) => {
        this.toastr.success('Profile updated successfully', 'Success');
        // Attendre 2 secondes avant de recharger la page
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        this.toastr.error('Error updating profile', 'Error');
      }
    });
  }
}
