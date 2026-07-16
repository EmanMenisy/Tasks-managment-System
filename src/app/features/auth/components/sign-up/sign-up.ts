import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../service/auth';
import { nameValidator } from '../../../../shared/validators/name.validator';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { JsonPipe } from '@angular/common';
import { matchPasswordValidator } from '../../../../shared/validators/match-password.validator';
import { toasterService } from '../../../../shared/toaster/service/toaster';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
protected showPassword = signal(false);
private fb = inject(FormBuilder);
private authService = inject(Auth);
private toaster = inject(toasterService);
private router = inject(ActivatedRoute);

signUpForm = this.fb.group({
  name: [
  '',
  [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
    nameValidator(),
  ],
],
  email: ['', [Validators.required , Validators.email]],
  department: [''],
  password:[
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
      passwordValidator(),
    ],
],
confirmPassword: ['', Validators.required],
},{
    validators: matchPasswordValidator(),
  });

createAcount(){
  const payload = {
    email: this.signUpForm.value.email!,
    password: this.signUpForm.value.password!,
    data :{
      name: this.signUpForm.value.name!,
      department: this.signUpForm.value.department!,
    }
  }
  this.authService.signUp(payload).subscribe({
    next:(res)=>{
       this.toaster.show({
      type: 'Success',
      message: 'you have been registered successfully.',
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

    }
  })
}

//toggle button to show and hide password
togglePassword(){
  this.showPassword.update(value => !value);
}


control(name: string) {
  return this.signUpForm.get(name);
}

}
