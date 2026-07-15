import { Injectable, signal } from '@angular/core';
import { toaster } from '../model/toaster';

@Injectable({
  providedIn: 'root',
})
export class toasterService {

 toaster = signal<toaster | null >(null);

 show(toast :toaster){
  this.toaster.set(toast);
  setTimeout(()=>{
    this.toaster.set(null);
  },toast.duration ?? 3000)
 }

 hidToaster(){
    this.toaster.set(null); 
 }

}
