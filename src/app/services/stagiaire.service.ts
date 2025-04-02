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
}
