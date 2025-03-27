import { Adresse } from './adresse.model';
import { Formation } from './formation.model';

export interface Entreprise {
  id?: number; // Optionnel car il est généré par la base de données
  nom: string;
  email: string;
  telephone: string;
  logoUrl?: string; // Valeur par défaut côté backend
  adresse?: Adresse; // Relation avec Adresse
  formations?: Formation[]; // Liste des formations liées à l'entreprise
}
