import { Routes } from '@angular/router';
import { HeroComponent } from './component/hero/hero.component';
import { ProjectsPageComponent } from './component/project-page/project-page.component';


export const routes: Routes = [
    {
        path: '',loadComponent: () => import('./component/hero/hero.component').then(m => m.HeroComponent), children: [
            {path: 'project-page', component:ProjectsPageComponent}
        ]
    },
    
]