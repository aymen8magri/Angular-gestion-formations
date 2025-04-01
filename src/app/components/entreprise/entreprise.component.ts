import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-entreprise',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './entreprise.component.html',
  styleUrl: './entreprise.component.css'
})
export class EntrepriseComponent {
constructor(private route:Router){}
  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
