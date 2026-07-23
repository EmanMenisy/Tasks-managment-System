import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { Auth } from '../../service/auth';
import { toasterService } from '../../../../shared/toaster/service/toaster';
import { Router, RouterModule } from '@angular/router';
@Component({
  standalone:true, 
  selector: 'app-forgrt-password',
  imports: [ReactiveFormsModule , RouterModule],
  templateUrl: './forgrt-password.html',
  styleUrl: './forgrt-password.css',
})
export class ForgrtPassword {
protected showPassword = signal(false);
private fb = inject(FormBuilder);
private authService = inject(Auth);
private toaster = inject(toasterService);
private Router = inject(Router);
isSubmit = signal<boolean>(false);
 forgetForm = this.fb.group({
    email: ['', [Validators.required , Validators.email]],
 }) 


 forgetPassword(){
  this.isSubmit.set(true);
  const payload = {
    email: this.forgetForm.value.email!,
  }
  this.authService.forgetPassword(payload).subscribe({
    next:(res)=>{
      this.toaster.show({
      type: 'Success',
      message: 'you have been Logged successfully.',
      icon: '/icons/Icon (3).png',
      position: 'top-right'
    });
    },
    error:(err)=>{
      console.log(err);
      this.toaster.show({
      type: 'Error',
      message: err.error.msg,
      icon: '/icons/error.svg',
      position: 'top-right'
    });
    console.log('Login Clicked rror');
    },
  })
}

 //get form control
 control(name:string){
   return this.forgetForm.get(name);
 }

 togglePassword(){
  this.showPassword.update(value => !value);
}


}
