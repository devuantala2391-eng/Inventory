import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened *ngIf="authService.isAuthenticated()">
        <mat-nav-list>
          <a mat-list-item routerLink="/gadgets">
            <mat-icon>devices</mat-icon>
            <span>Gadgets</span>
          </a>
          <a mat-list-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav-container {
      height: 100vh;
    }

    mat-sidenav {
      width: 250px;
      padding: 16px;
    }

    .mat-list-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}