import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  signupForm: FormGroup;
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'password2': new FormControl(null, Validators.required),
      'admin': new FormControl(true)
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
    /* let body = this.signupForm.value.email + " | " + this.signupForm.value.password
    this.toastr.success(body, 'Inicio de sesión exitoso'); */
  }

}
