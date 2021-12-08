import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  contentForm: FormGroup;
  loading: boolean = false;
  content: any;

  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.contentForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, Validators.required],
    });
  }

  createItem() {
    console.log('add');
  }

}
