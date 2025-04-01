import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', Validators.required] // Validation pour le rôle
    });
  }

  onSubmit(): void {
    
      if (this.loginForm.value.role === 'stagiaire') {
        this.authService.loginStagiaire(this.loginForm.value).subscribe(
          (response: any) => {
            this.toastr.success('Connexion réussie !', 'Bienvenue');
            localStorage.setItem('token', response.token);
            this.router.navigate(['/stagiaire']);
          },
          (error) => {
            this.toastr.error('Identifiants invalides. Veuillez réessayer.', 'Échec de la connexion');
            console.error('Erreur de connexion stagiaire:', error);
          }
        );
      } else if (this.loginForm.value.role === 'entreprise') {
        this.authService.loginEntreprise(this.loginForm.value).subscribe(
          (response: any) => {
            this.toastr.success('Connexion réussie !', 'Bienvenue');
            localStorage.setItem('token', response.token);
            this.router.navigate(['/entreprise']);
          },
          (error) => {
            this.toastr.error('Identifiants invalides. Veuillez réessayer.', 'Échec de la connexion');
            console.error('Erreur de connexion entreprise:', error);
          }
        );
      } else {
        console.error('Rôle non valide');
      }
    }
  

}