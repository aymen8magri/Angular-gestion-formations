import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormationStagiaire } from '../models/FormationStagiaire.model';
import { Stagiaire } from '../models/Stagiaire.model';

@Injectable({
  providedIn: 'root'
})
export class FormationStagiaireService {

  private URL = 'http://localhost:9050';

  constructor(private http: HttpClient) { }
  /**
   * ✅ Inscrire un stagiaire à une formation
   */
  inscrireStagiaire(formationId: number, stagiaireId: number): Observable<FormationStagiaire> {
    return this.http.post<FormationStagiaire>(`${this.URL}/inscrireStagiaire/${formationId}/${stagiaireId}`, {});
  }

  /**
   * ✅ Modifier l'inscription d'un stagiaire (changer l'état du paiement)
   */
  modifierInscription(id: number, paiementEffectue: boolean): Observable<FormationStagiaire> {
    return this.http.put<FormationStagiaire>(`${this.URL}/modifierInscription/${id}/${paiementEffectue}`, {});
  }

  /**
   * ✅ Supprimer une inscription par ID
   */
  supprimerInscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/supprimerInscription/${id}`);
  }

  /**
   * ✅ Consulter les détails d'une inscription
   */
  consulterInscription(id: number): Observable<FormationStagiaire> {
    return this.http.get<FormationStagiaire>(`${this.URL}/consulterInscription/${id}`);
  }

  /**
   * ✅ Lister toutes les inscriptions (tous les couples formation/stagiaire)
   */
  listerInscriptions(): Observable<FormationStagiaire[]> {
    return this.http.get<FormationStagiaire[]>(`${this.URL}/listerInscriptions`);
  }

  /**
   * ✅ Lister les stagiaires inscrits à une formation donnée   !!!!!!!!!!!!!!!!!
   */
  getStagiairesInscrits(formationId: number): Observable<Stagiaire[]> {
    return this.http.get<Stagiaire[]>(`${this.URL}/stagiairesInscrits/${formationId}`);
  }

  /**
   * ✅ Lister toutes les formations auxquelles un stagiaire est inscrit
   */
  getFormationsParStagiaire(stagiaireId: number): Observable<FormationStagiaire[]> {
    return this.http.get<FormationStagiaire[]>(`${this.URL}/formationsParStagiaire/${stagiaireId}`);
  }

  /**
   * ✅ Lister les stagiaires inscrits à une formation AVEC paiement effectué
   */
  getStagiairesPaiementEffectue(formationId: number): Observable<FormationStagiaire[]> {
    return this.http.get<FormationStagiaire[]>(`${this.URL}/paiementsEffectues/${formationId}`);
  }

  /**
   * ✅ Lister les stagiaires inscrits à une formation SANS paiement effectué
   */
  getStagiairesPaiementNonEffectue(formationId: number): Observable<FormationStagiaire[]> {
    return this.http.get<FormationStagiaire[]>(`${this.URL}/paiementsNonEffectues/${formationId}`);
  }

  // Vérifier si un stagiaire est inscrit à une formation
  estInscrit(stagiaireId: number, formationId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.URL}/estInscrit/${stagiaireId}/${formationId}`);
  }

   // Récupérer les formations inscrites par un stagiaire
   getFormationsInscritesByStagiaire(stagiaireId: number): Observable<any> {
    return this.http.get(`${this.URL}/formationsInscritesByStagiaire/${stagiaireId}`);
  }

  // Récupérer les formations inscrites par un stagiaire avec paiement non effectué
  getFormationsInscritesByStagiaireAndPaiementNonEffectue(stagiaireId: number): Observable<any> {
    return this.http.get(`${this.URL}/formationsInscritesByStagiaireAndPaiementNonEffectue/${stagiaireId}`);
  }
}
