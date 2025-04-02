import { Entreprise } from "./entreprise.model";
import { Formateur } from "./Formateur.model";


export interface Formation {
  id?: number; // Optionnel car il est généré par la BD
  titre: string;
  description: string;
  dateDebut: string; // Stocké sous forme de chaîne (format ISO 8601)
  dateFin: string;
  nbrePlace: number;
  duree: number;
  prix: number;
  imageUrl?: string; // Optionnel, valeur par défaut gérée côté backend
  formateur?: { id: number };  // ✅ Modification ici
  entreprise?: { id: number }; // ✅ Modification ici
  planning?:[]
}
