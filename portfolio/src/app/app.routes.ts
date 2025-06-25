import { Routes } from '@angular/router';
import { SplashComponent } from './component/splash/splash.component';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { ContactComponent } from './component/contact/contact.component';



export const routes: Routes = [
   {
    path: 'splash',
    component: SplashComponent,
    children: [
      { path: 'home', component: HomeComponent, children: [
        { path: 'about',component: AboutComponent },
        { path: 'projects',component: ProjectsComponent  },
        { path: 'contact',component: ContactComponent },
      ] }
    ]
  },
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
];