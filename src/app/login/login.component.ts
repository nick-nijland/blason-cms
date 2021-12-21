import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  animations: [
    trigger('loadAnimation', [
      state('open', style({
        marginTop: '0',
        opacity: '1'
      })),
      state('closed', style({
        marginTop: '-100px',
        opacity: '0'
      })),
      transition('closed => open', [animate('.3s ease-in-out')]),
    ]),
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  loginForm: FormGroup;
  resetPasswordForm: FormGroup;
  showError: boolean = false;
  loggedIn: boolean = false;
  resetPassword: boolean = false;
  isLoaded: boolean = false;
  allowResetPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
    this.resetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit(): void {
    this.isLoaded = true;
  }

  submit() {
    this.loading = true;
    this.showError = false;
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loggedIn = true;
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/veelgestelde-vragen']);
        }, 2000);
      }, err => {
        this.showError = true;
        this.loading = false;
      });
  }

  sendResetPassword() {
    const email = this.loginForm.value;
    this.auth.sendPasswordResetEmail(email);
  }

  forgotPassword() {
    this.resetPassword = !this.resetPassword;
  }

  login = {
    title: "Inloggen",
    subtitle: "Log in om content te beheren.",
    email: "E-mail",
    password: "Wachtwoord",
    forgotPassword: "Wachtwoord vergeten?",
    forgotPasswordSubtitle: "Reset het wachtwoord.",
    required: "Dit veld is verplicht",
    errorMessage: "Oeps, daar ging iets mis.",
    send: "Verstuur",
    cancel: "Annuleren"
  };

}
