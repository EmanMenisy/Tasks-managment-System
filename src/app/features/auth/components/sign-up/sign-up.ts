import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../service/auth';
import { nameValidator } from '../../../../shared/validators/name.validator';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { JsonPipe } from '@angular/common';
import { matchPasswordValidator } from '../../../../shared/validators/match-password.validator';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule , JsonPipe],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
protected showPassword = signal(false);
private fb = inject(FormBuilder);
private authService = inject(Auth);
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
    next:(res)=>{console.log(res)},
    error:(err)=>{},
    complete:()=>{}
  })
}

//toggle button to show and hide password
togglePassword(){
  this.showPassword.update(value => !value);
}


//get password control to insure validation
get password() {
  return this.signUpForm.controls.password;
}

get confirmPassword() {
  return this.signUpForm.controls.confirmPassword;
}

get email() {
  return this.signUpForm.controls.email;
}

}
