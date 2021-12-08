import { Component, OnInit, Input } from '@angular/core';


import { Tip } from './tip.interface';

@Component({
  selector: 'tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void {

  }

}
