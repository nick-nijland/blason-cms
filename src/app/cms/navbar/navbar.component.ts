import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentRoute: string;
  activeMenu: boolean = false;
  contentDisabled: boolean = true;

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) {


  }

  ngOnInit(): void {
    //console.log(this.route);
  }

  logOut() {
    this.auth.signOut()
      .then(res => {
        this.router.navigate(['login']);
      }, err => {
        console.log(err.code);
      });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  navbar = {
    title: "BlasonCMS",
    logout: "Uitloggen"
  };



}
