import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blason-cms';
  email: string = '';
  password: string = '';

  constructor(public auth: AngularFireAuth) { }

  login() {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => console.log(res))
      .catch(error => console.log(error.code));
  }

}
