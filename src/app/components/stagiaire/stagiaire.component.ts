import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stagiaire',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './stagiaire.component.html',
  styleUrl: './stagiaire.component.css'
})
export class StagiaireComponent {
  constructor(private route:Router){}
  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
