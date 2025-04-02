import { FormationStagiaire } from "./FormationStagiaire.model";

export interface Stagiaire {
    id?: number;
    nom: string;
    prenom: string;
    email: string;
    password?: string; // Facultatif, à gérer avec précaution pour la sécurité
    role?: string; // Par défaut "STAGIAIRE"
    telephone?: string;
    dateNaissance?: string; // Format ISO string (YYYY-MM-DD)
    photoUrl?: string;
    inscriptions?: FormationStagiaire[];
}