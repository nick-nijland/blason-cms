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

  update(key: string, value: any): Promise<void> {
    return this.productRef.update(key, value);
  }


}
