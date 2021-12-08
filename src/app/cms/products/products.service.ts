import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  product: Product;
  productRef: AngularFireList<Product>;
  private dbPath = '/products';

  constructor(private db: AngularFireDatabase) {
    this.productRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Product> {
    return this.productRef;
  }

  create(product: Product): any {
    return this.productRef.push(product);
  }

  delete(key: string): Promise<void> {
    return this.productRef.remove(key);
  }

  text() {
    return {
      delete: "Verwijder",
    };
  }


  // getAll(): AngularFireList<Faq> {
  //   return this.faqRef;
  // }


  //   update(key: string, value: any): Promise<void> {
  //     return this.faqRef.update(key, value);
  //   }

  //   delete(key: string): Promise<void> {
  //     return this.faqRef.remove(key);
  //   }

  //   deleteAll(): Promise<void> {
  //     return this.faqRef.remove();
  //   }

}
