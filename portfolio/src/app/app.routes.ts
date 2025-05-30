import { Routes } from '@angular/router';
import { HeroComponent } from './component/hero/hero.component';
import { ProjectsPageComponent } from './component/project-page/project-page.component';


export const routes: Routes = [
    {
        path: '',component:HeroComponent, pathMatch: 'full', children: [
            {path: 'project-page', component:ProjectsPageComponent}
        ]
    },
    
]