import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Content } from './content.interface';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private dbPath = '/content';
  content: Content;
  contentRef: AngularFireList<Content>;

  constructor(private db: AngularFireDatabase) {
    this.contentRef = db.list(this.dbPath);
  }

  create(content: Content): any {
    console.log(content);
    //faq.visible === null ? faq.visible = false : faq.visible = true;
    return this.contentRef.push(content);
  }

}
