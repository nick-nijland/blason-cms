import { Component, OnInit, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ProductsService } from './products.service';
import { map } from 'rxjs/operators';
import { Product } from './product.interface';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;
  modalRef?: BsModalRef;
  editMode: boolean = false;
  loading: boolean = true;
  currentProduct: Product;
  products: any;
  content: any;

  constructor(
    private productService: ProductsService,
    private modalService: BsModalService,
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
    this.closeModal();
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

  openModal(template: TemplateRef<any>, type: string, item?: any) {

    if (type === 'add') {
      this.editMode = false;
      this.productForm.reset();
    }

    if (type === 'edit') {
      this.editMode = true;
      this.currentProduct = item;
      this.productForm.patchValue({
        title: item.title,
        price: item.price,
        content: item.content,
        visible: item.visible
      });
    }

    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef?.hide();
    this.productForm.reset();
  }

  text = {
    noProducts: "Nog geen producten",
    addProduct: "Eentje toevoegen?",
    edit: "Bewerk",
    delete: "Verwijder",
    createProduct: "Product toevoegen",
    updateProduct: "Product bewerken",
    title: "Titel",
    price: "Prijs",
    description: "Beschrijving",
    visible: "Zichtbaar"
  };

}
