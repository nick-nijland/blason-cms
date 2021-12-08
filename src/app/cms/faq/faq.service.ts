import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Faq } from './faq.interface';


@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private dbPath = '/faq';
  faq: Faq;
  faqRef: AngularFireList<Faq>;

  constructor(private db: AngularFireDatabase) {
    this.faqRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Faq> {
    return this.faqRef;
  }

  create(faq: Faq): any {
    faq.visible === null ? faq.visible = false : faq.visible = true;
    return this.faqRef.push(faq);
  }

  update(key: string, value: any): Promise<void> {
    return this.faqRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.faqRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.faqRef.remove();
  }
}
