import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { ContentService } from './content.service';
import { Content } from './content.interface';

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
    private contentService: ContentService,
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
    this.contentService.create(this.contentForm.value)
      .then(() => {
        console.log('add');
      });
  }

}
