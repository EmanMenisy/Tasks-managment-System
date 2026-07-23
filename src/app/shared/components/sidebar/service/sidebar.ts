import { HostListener, Injectable, OnInit, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class sideBarService{

  isSideOpen = signal<boolean>(false);
  isMobile = signal(false);

    toggleSideBar(){
      this.isSideOpen.update(value => !value);
    }

    checkScreen() {
      this.isMobile.set(window.innerWidth < 768);
    }
   

}
