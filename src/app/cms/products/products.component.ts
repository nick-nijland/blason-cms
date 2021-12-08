import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ProductsService } from './products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;
  editMode: boolean = false;
  loading: boolean = true;
  products: any;
  content: any;

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.fetchItems();
    this.productForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, Validators.required],
      price: [null, Validators.required],
      visible: [null, Validators.required],
    });
  }

  createProduct() {
    this.productService.create(this.productForm.value).then(() => {
      this.productForm.reset();
    });
  }

  fetchItems() {
    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.products = data;
      this.loading = false;
    });
  }

  deleteProduct(item: any) {
    this.productService.delete(item.key)
      .then(() => {
        console.log('asijdasij');
      })
      .catch(err => console.log(err));
  }

}
