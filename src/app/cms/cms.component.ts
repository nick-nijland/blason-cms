import { Component, OnInit } from '@angular/core';


interface Note {
  content: string,
  hearts: number,
  id?: string;
}

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {



  ngOnInit(): void {

  }

}
