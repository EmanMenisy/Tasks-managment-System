import { Component, inject } from '@angular/core';
import { toasterService } from '../service/toaster';
toasterService

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
})
export class Toaster {

  toasterService = inject(toasterService);

}
