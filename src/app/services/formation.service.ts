import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formation } from '../models/formation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private URL = 'http://localhost:9050';
  
  constructor( private http: HttpClient ) { }

   // Ajouter une formation
   ajouterFormation(formation: Formation, file?: File): Observable<Formation> {
    const formData = new FormData();
    formData.append('formation', JSON.stringify(formation));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Formation>(`${this.URL}/addFormation`, formData);
  }

  // Modifier une formation
  modifierFormation(id: number, formation: Formation, file?: File): Observable<Formation> {
    const formData = new FormData();
    formData.append('formation', JSON.stringify(formation));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<Formation>(`${this.URL}/modifierFormations/${id}`, formData);
  }

  // Supprimer une formation
  supprimerFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/deleteFormation/${id}`);
  }

  // Consulter une formation par ID
  consulterFormation(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.URL}/consulterFormation/${id}`);
  }

  // Lister toutes les formations
  listerFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.URL}/formations`);
  }
}
