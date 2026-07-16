import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLayout } from './features/auth/components/auth-layout/auth-layout';
import { Toaster } from "./shared/toaster/components/toaster";
import { Auth } from './features/auth/service/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toaster],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit{
  protected readonly title = signal('tasksManagementSystem');
  private authService = inject(Auth);

  ngOnInit(): void {
    this.authService.checkRememberStatus();
  }
}
