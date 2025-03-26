import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formateur } from '../models/Formateur.model';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  private URL = 'http://localhost:9050';

  constructor( private http: HttpClient ) { }

  // Get all formateurs
  listerFormateurs(): Observable<Formateur[]> {
    return this.http.get<Formateur[]>(`${this.URL}/formateurs`);
  }

  // Get formateur by id
  consulterFormateur(id: number): Observable<Formateur> {
    return this.http.get<Formateur>(`${this.URL}/consulterFormateur/${id}`);
  }

  // Create formateur
  ajouterFormateur(formateur: Formateur, file?: File): Observable<Formateur> {
    const formData = new FormData();
    formData.append('formateur', JSON.stringify(formateur));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Formateur>(`${this.URL}/addFormateur`, formData);
  }

  // Update formateur
  modifierFormateur(id: number, formateur: Formateur, file?: File): Observable<Formateur> {
    const formData = new FormData();
    formData.append('formateur', JSON.stringify(formateur));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<Formateur>(`${this.URL}/modifierFormateur/${id}`, formData);
  }

  // Delete formateur
  supprimerFormateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/deleteFormateur/${id}`);
  }


}
