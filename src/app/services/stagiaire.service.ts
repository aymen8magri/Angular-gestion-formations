import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stagiaire } from '../models/Stagiaire.model';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  private URL = 'http://localhost:9050';

  constructor(private http: HttpClient) { }

  // Récupérer une Stagiaire par ID
  getStagiaireById(id: number): Observable<Stagiaire> {
    return this.http.get<Stagiaire>(`${this.URL}/consulterStagiaire/${id}`);
  }

  // Modifier une Stagiaire
  modifierStagiaire(id: number, stagiaire: Stagiaire, file?: File): Observable<Stagiaire> {
    const formData = new FormData();
    formData.append('stagiaire', JSON.stringify(stagiaire));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<Stagiaire>(`${this.URL}/${id}`, formData);
  }

  // Supprimer une Stagiaire
  supprimerStagiaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/deleteStagiaire/${id}`);
  }

  // Lister toutes les Stagiaires
  listerStagiaires(): Observable<Stagiaire[]> {
    return this.http.get<Stagiaire[]>(`${this.URL}/listerStagiaires`);
  }

  

  
}
