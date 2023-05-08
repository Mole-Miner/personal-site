import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";

import { PersonalSiteMaterialModule } from "personal-site-material";
import { ActionAuthLogin } from "personal-site-core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
  standalone: true,
  imports: [ CommonModule, PersonalSiteMaterialModule, FormsModule, ReactiveFormsModule ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  get usernameControl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup<{ username: FormControl<string | null>, password: FormControl<string | null> }>({
      username: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, [ Validators.required ])
    });
  }

  onSubmitLoginForm(): void {
    const payload = this.loginForm.getRawValue();
    this.store.dispatch(new ActionAuthLogin(payload));
  }
}
