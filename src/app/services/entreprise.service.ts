import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entreprise } from '../models/entreprise.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private URL = 'http://localhost:9050';

  constructor( private http: HttpClient ) { }

  // Ajouter une entreprise
  ajouterEntreprise(entreprise: Entreprise, file?: File): Observable<Entreprise> {
    const formData = new FormData();
    formData.append('entreprise', JSON.stringify(entreprise));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Entreprise>(`${this.URL}/addEntreprise`, formData);
  }

  // Modifier une entreprise
  modifierEntreprise(id: number, entreprise: Entreprise, file?: File): Observable<Entreprise> {
    const formData = new FormData();
    formData.append('entreprise', JSON.stringify(entreprise));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<Entreprise>(`${this.URL}/updateEntreprise/${id}`, formData);
  }

  // Récupérer toutes les entreprises
  getAllEntreprises(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(`${this.URL}/getAllEntreprises`);
  }

  // Récupérer une entreprise par ID
  getEntrepriseById(id: number): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.URL}/getEntreprise/${id}`);
  }

  // Supprimer une entreprise
  deleteEntreprise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/deleteEntreprise/${id}`);
  }
}
