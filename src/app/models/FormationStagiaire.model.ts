import { Formation } from "./formation.model";
import { Stagiaire } from "./Stagiaire.model";

export interface FormationStagiaire {
    id?: number;
    stagiaire: Stagiaire;
    formation: Formation;
    dateInscription: string;
    paiementEffectue: boolean;
}