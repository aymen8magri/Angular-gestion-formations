import { Formation } from "./formation.model";

export interface Formateur {
    id?: number; // Optionnel car généré automatiquement
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    specialite: string;
    experience: number;
    photoUrl?: string; // Optionnel avec une valeur par défaut côté frontend si nécessaire
    formations?: Formation[]; // Associe les formations à ce formateur
  }
  