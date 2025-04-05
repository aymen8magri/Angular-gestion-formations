import { Routes } from '@angular/router';

export const routes: Routes = [

    // Application routes goes here
    { path: '', title: 'Acceuil', loadComponent: (() => import('./components/application/home/home.component').then(m => m.HomeComponent)) },
    { path: 'home', title: 'Acceuil', loadComponent: (() => import('./components/application/home/home.component').then(m => m.HomeComponent)) },
    { path: 'entreprises', title: 'Entreprises', loadComponent: (() => import('./components/application/entreprises/entreprises.component').then(m => m.EntreprisesComponent)) },
    { path: 'formateurs', title: 'Formateurs', loadComponent: (() => import('./components/application/formateurs/formateurs.component').then(m => m.FormateursComponent)) },
    { path: 'faq', title: 'FAQ', loadComponent: (() => import('./components/application/faq/faq.component').then(m => m.FaqComponent)) },
    { path: 'list-formations', title: 'List Formations', loadComponent: (() => import('./components/application/list-formations/list-formations.component').then(m => m.ListFormationsComponent)) },
    { path: 'list-formations/:id', title: 'Detail Formation', loadComponent: (() => import('./components/application/detail-formation/detail-formation.component').then(m => m.DetailFormationComponent)) },
    { path: 'formations/entreprise/:entrepriseId', title: 'Formations Entreprise', loadComponent: (() => import('./components/application/formation-by-entity/formation-by-entity.component').then(m => m.FormationByEntityComponent)) },
    { path: 'formations/formateur/:formateurId', title: 'Formations Formateur', loadComponent: (() => import('./components/application/formation-by-entity/formation-by-entity.component').then(m => m.FormationByEntityComponent)) },

    { path: 'login', title: 'login', loadComponent: (() => import('./components/application/login/login.component').then(m => m.LoginComponent)) },
    { path: 'register', title: 'register', loadComponent: (() => import('./components/application/register/register.component').then(m => m.RegisterComponent)) },


    // Stagiaire routes goes here
    {
        path: 'stagiaire', title: 'Stagiaire', loadComponent: (() => import('./components/stagiaire/stagiaire.component').then(m => m.StagiaireComponent)),
        children: [
            { path: '', title: 'dashboard', loadComponent: (() => import('./components/stagiaire/dashboard/dashboard.component').then(m => m.DashboardComponent)) },
            { path: 'profile', title: 'Profil', loadComponent: () => import('./components/stagiaire/profile/profile.component').then(m => m.ProfileComponent) },
            { path: 'mes-formations', title: 'Mes Formations', loadComponent: () => import('./components/stagiaire/mes-formations/mes-formations.component').then(m => m.MesFormationsComponent) },
            { path: 'inscriptions', title: 'Inscriptions', loadComponent: () => import('./components/stagiaire/inscriptions/inscriptions.component').then(m => m.InscriptionsComponent) },
        ]
    },

    // entreprise routes goes here
    {
        path: 'entreprise', title: 'Entreprise', loadComponent: (() => import('./components/entreprise/entreprise.component').then(m => m.EntrepriseComponent)),
        children: [
            { path: '', title: 'dashboard', loadComponent: (() => import('./components/entreprise/dashboard/dashboard.component').then(m => m.DashboardComponent)) },
            { path: 'profile', title: 'Profil', loadComponent: () => import('./components/entreprise/profile/profile.component').then(m => m.ProfileComponent) },
            { path: 'formations', title: 'Formations', loadComponent: () => import('./components/entreprise/formations/formations.component').then(m => m.FormationsComponent) },
            { path: 'inscriptions/:id', title: 'Inscriptions', loadComponent: () => import('./components/entreprise/inscriptions/inscriptions.component').then(m => m.InscriptionsComponent) },
            { path: 'add-formation', title: 'Ajouter Formation', loadComponent: () => import('./components/entreprise/add-formation/add-formation.component').then(m => m.AddFormationComponent) },
            { path: 'edit-formation/:id', title: 'Modifier Formation', loadComponent: () => import('./components/entreprise/add-formation/add-formation.component').then(m => m.AddFormationComponent) },
            { path: 'demandes-inscrirption/:id', title: 'Demandes Inscrirption', loadComponent: () => import('./components/entreprise/demande-inscrirption/demande-inscrirption.component').then(m => m.DemandeInscrirptionComponent) }
        ]
    },


    //error 404
    { path:'**', title: '404', loadComponent: (() => import('./components/application/error404/error404.component').then(m => m.Error404Component)) },

];
