import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { sideBarService } from '../service/sidebar';
import { CommonModule, NgClass } from '@angular/common';
import { Auth } from '../../../../features/auth/service/auth';
import { Layout } from '../../../layout/layout/service/layout';

@Component({
  standalone :true,
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgClass ,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar{
   sideBarService = inject(sideBarService);
   layoutService = inject(Layout);
   authService = inject(Auth);
   router = inject(Router);
   toggleSideBar(){
     this.sideBarService.toggleSideBar();
   }

  logOut(){
    let storage = this.authService.getStorage()
    this.authService.logOut({}).subscribe({
      next:(res)=>{
        storage.removeItem('accessToken');
        storage.removeItem('refreshToken');
        this.router.navigate(['/auth/log-in'])
      },
    })
  }

  ngOnInit() {
  this.sideBarService.checkScreen();
  }

  @HostListener('window:resize')
  onResize() {
    this.sideBarService.checkScreen();
    console.log(window.innerWidth);
 }

 closeSide(){
  this.sideBarService.toggleSideBar();
 }
}
