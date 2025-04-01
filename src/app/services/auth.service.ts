import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:9050';

  constructor(private http: HttpClient) { }

  //register Stagiaire
  registerStagiaire(data: any) {
    return this.http.post(`${this.URL}/addStagiaire`, data);
  }
  //register Entreprise
  registerEntreprise(data: any) {
    return this.http.post(`${this.URL}/addEntreprise`, data);
  }

  //loginStagiaire
  loginStagiaire(data: any) {
    return this.http.post(`${this.URL}/auth/loginStagiaire`, data);
  }

  //loginEntreprise
  loginEntreprise(data: any) {
    return this.http.post(`${this.URL}/auth/loginEntreprise`, data);
  }

  //isAuthenticated
  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  //getUserIdFromToken
  getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    }
    return null;
  }

  //getRoleFromToken
  getRoleFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du payload du token
      return payload.role; // Retourne le rôle
    }
    return null;
  }
  
}
