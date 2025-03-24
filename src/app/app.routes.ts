import { Routes } from '@angular/router';

export const routes: Routes = [

    // Application routes goes here
    { path: '', title:'Acceuil', loadComponent: (() => import('./components/application/home/home.component').then(m => m.HomeComponent)) },
    { path: 'home', title:'Acceuil', loadComponent: (() => import('./components/application/home/home.component').then(m => m.HomeComponent)) },
    { path: 'about', loadComponent: (() => import('./components/application/about/about.component').then(m => m.AboutComponent)) },
    { path: 'faq', loadComponent: (() => import('./components/application/faq/faq.component').then(m => m.FaqComponent)) },
    { path: 'list-formations', loadComponent: (() => import('./components/application/list-formations/list-formations.component').then(m => m.ListFormationsComponent)) },
    { path: 'list-formations/:id', loadComponent: (() => import('./components/application/detail-formation/detail-formation.component').then(m => m.DetailFormationComponent)) },
    
    { path: 'login', loadComponent: (() => import('./components/application/login/login.component').then(m => m.LoginComponent)) },
    { path: 'register', loadComponent: (() => import('./components/application/register/register.component').then(m => m.RegisterComponent)) },

    // Stagiaire routes goes here
    

];
