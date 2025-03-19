import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter([
      { path: 'login', loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent) },
      { 
        path: 'gadgets', 
        loadComponent: () => import('./app/components/gadget-list/gadget-list.component').then(m => m.GadgetListComponent),
        canActivate: [() => import('./app/guards/auth.guard').then(m => m.AuthGuard)]
      },
      { path: '', redirectTo: '/gadgets', pathMatch: 'full' },
      { path: '**', redirectTo: '/gadgets' }
    ])
  ]
}).catch(err => console.error(err));