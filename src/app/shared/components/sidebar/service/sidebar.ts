import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class sideBarService {

  isSideOpen = signal<boolean>(false);

   toggleSideBar(){
     this.isSideOpen.update(value => !value);
   }

}
