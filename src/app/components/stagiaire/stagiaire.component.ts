import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { StagiaireService } from '../../services/stagiaire.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stagiaire',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './stagiaire.component.html',
  styleUrl: './stagiaire.component.css'
})
export class StagiaireComponent {
  stagiaire: any;

  constructor(private route: Router,
    private stagiaireService: StagiaireService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.stagiaireService.getStagiaireById(this.authService.getUserIdFromToken()).subscribe({
      next: (res) => {
        this.stagiaire = res;
        console.log(this.stagiaire)
      }
    })
  }
  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
