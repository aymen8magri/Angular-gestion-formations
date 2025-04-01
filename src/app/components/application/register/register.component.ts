import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {}

  ngOnInit() {
    // Initialiser le formulaire avec les validateurs
    this.registrationForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]], 
      prenom: [''],  
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required], 
    });
  }

  // Méthode pour soumettre le formulaire
  onSubmit() {
    const formData = new FormData();
    if (this.registrationForm.get('role')?.value === 'stagiaire') {
      // Enregistrer un stagiaire
      const stagiaireData = {
        nom: this.registrationForm.get('nom')?.value,
        prenom: this.registrationForm.get('prenom')?.value,
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
      };
      formData.append('stagiaire', JSON.stringify(stagiaireData));
      this.authService.registerStagiaire(formData).subscribe(
        (response) => {
          console.log('Stagiaire enregistré avec succès', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement du stagiaire', error);
        }
      );
    } else if (this.registrationForm.get('role')?.value === 'entreprise') {
      // Enregistrer une entreprise
      const entrepriseData = {
        nom: this.registrationForm.get('nom')?.value,
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
      };
      formData.append('entreprise', JSON.stringify(entrepriseData));
      this.authService.registerEntreprise(formData).subscribe(
        (response) => {
          console.log('Entreprise enregistrée avec succès', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement de l\'entreprise', error);
        }
      );
    } 
  }

}
