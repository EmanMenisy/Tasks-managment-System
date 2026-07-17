import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { sideBarService } from '../service/sidebar';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  standalone :true,
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgClass ,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
   sideBarService = inject(sideBarService);
   
   toggleSideBar(){
     this.sideBarService.toggleSideBar();
   }
}
