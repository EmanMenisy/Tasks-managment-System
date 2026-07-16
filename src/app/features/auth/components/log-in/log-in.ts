import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { Auth } from '../../service/auth';
import { toasterService } from '../../../../shared/toaster/service/toaster';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn {
protected showPassword = signal(false);
private fb = inject(FormBuilder);
private authService = inject(Auth);
private toaster = inject(toasterService);
private Router = inject(Router);

 LoginForm = this.fb.group({
    email: ['', [Validators.required , Validators.email]],
    password:[
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
      passwordValidator(),
    ],
  ],
   rememberMe: [false]
 }) 


 LogIn(){
  const payload = {
    email: this.LoginForm.value.email!,
    password: this.LoginForm.value.password!,
  }
  this.authService.LogIn(payload).subscribe({
    next:(res)=>{
      this.authService.saveSession(res , this.LoginForm.value.rememberMe);
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
    },
    complete:()=>{
      this.Router.navigate(['/layout']);
    }
  })
}

 //get form control
 control(name:string){
   return this.LoginForm.get(name);
 }

 togglePassword(){
  this.showPassword.update(value => !value);
}


}
