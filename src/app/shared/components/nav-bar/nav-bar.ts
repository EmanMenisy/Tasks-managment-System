import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../features/auth/service/auth';
import { Router } from '@angular/router';

@Component({
  standalone :true,
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {
  authService = inject(Auth);
  router = inject(Router);
  name = signal<string>('');
  department=signal<string>('');
  password=signal<string>('');
  isDropdownOpen = signal<boolean>(false);
  ngOnInit(): void {
    this.getUserData();
  }
 
  getUserData(){
    this.authService.getUserData().subscribe({
      next:(res)=>{
       this.name.set(res.user_metadata.name)
       this.department.set(res.user_metadata.department);

      },
      error:()=>{},
      complete:()=>{},
    })
  }

  toggleDropMenu(){
    this.isDropdownOpen.update(value => !value)
  }

  logOut(){
    this.authService.logOut({}).subscribe({
      next:(res)=>{
        localStorage.removeItem('access_token');
        this.router.navigate(['/auth/log-in'])
      },
      error:()=>{},
    })
  }
}
