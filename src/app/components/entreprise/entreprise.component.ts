import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { EntrepriseService } from '../../services/entreprise.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-entreprise',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './entreprise.component.html',
  styleUrl: './entreprise.component.css'
})
export class EntrepriseComponent {
  entreprise: any;

  constructor(private route: Router,
    private entrepriseService: EntrepriseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.entrepriseService.getEntrepriseById(this.authService.getUserIdFromToken()).subscribe({
      next: (res) => {
        this.entreprise = res;
        console.log(this.entreprise)
      }
    })
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
