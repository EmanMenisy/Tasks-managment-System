import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLayout } from './features/auth/components/auth-layout/auth-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tasksManagementSystem');
}
