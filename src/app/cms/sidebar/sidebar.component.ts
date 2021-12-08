import { Component, OnInit } from '@angular/core';
import { TIPS } from './tips';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  tips = TIPS;

  constructor() { }

  ngOnInit(): void {

  }

}
