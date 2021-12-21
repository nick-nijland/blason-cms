import { Component, OnInit, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProductsService } from './products.service';
import { map } from 'rxjs/operators';
import { Product } from './product.interface';
import { FileUploadService } from './file-upload.service';
import { FileUpload } from './file-upload.interface';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  selectedFiles: any;
  currentFileUpload: FileUpload;
  productForm: FormGroup;
  modalRef?: BsModalRef;
  editMode: boolean = false;
  loading: boolean = true;
  currentProduct: Product;
  products: any;
  content: any;
  downloadURL: any;

  constructor(
    private afStorage: AngularFireStorage,
    private productService: ProductsService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private uploadService: FileUploadService,
    private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.fetchItems();
    this.productForm = this.formBuilder.group({
      img: [null],
      title: [null, [Validators.required]],
      content: [null, Validators.required],
      price: [null, Validators.required],
      visible: [null, Validators.required],
    });
  }

  // getProductImage(item: Product) {
  //   return this.afStorage.ref('/uploads/nick.jpeg').getDownloadURL();
  // }

  createProduct() {
    //this.productForm.value.img = this.selectedFiles[0].name;

    if (this.editMode === true) {
      this.updateProduct();
      this.closeModal();
      return;
    }

    this.productService.create(this.productForm.value).then(() => {
      this.productForm.reset();
    });
    //this.upload();
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
        //img: item.img,
        title: item.title,
        price: item.price,
        content: item.content,
        visible: item.visible
      });
    }

    this.modalRef = this.modalService.show(template);
  }

  updateProduct(): void {

    const data = {
      //img: this.productForm.value.img,
      title: this.productForm.value.title,
      price: this.productForm.value.price,
      content: this.productForm.value.content,
      visible: this.productForm.value.visible
    };

    this.productService.update(this.currentProduct.key, data)
      .then(() => {
        //this.handleMessage('update');
        console.log('updated');
      })
      .catch(err => console.log(err));
  }

  closeModal() {
    this.modalRef?.hide();
    this.productForm.reset();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log('aiosjdisja');
    console.log(this.selectedFiles[0].name);
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        // to do implement progress bar
        console.log(percentage);
      },
      error => {
        console.log(error);
      }
    );
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
