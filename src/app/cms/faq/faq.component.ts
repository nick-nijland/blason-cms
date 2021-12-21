import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FaqService } from './faq.service';
import { Faq } from './faq.interface';
import { Message } from './message.interface';
import { map } from 'rxjs/operators';
import { bounceInUpOnEnterAnimation, bounceOutDownOnLeaveAnimation, } from 'angular-animations';

@Component({
  selector: 'faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    bounceInUpOnEnterAnimation(),
    bounceOutDownOnLeaveAnimation()
  ]
})
export class FaqComponent implements OnInit {

  faq: Faq;
  message: Message;
  modalRef?: BsModalRef;
  editForm: FormGroup;
  editMode: boolean = false;
  faqItems: any;
  currentFaq: Faq;
  isOpen: boolean = true;
  loading: boolean = true;
  showMessage: boolean = false;

  constructor(
    private faqService: FaqService,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.fetchItems();
    this.editForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, Validators.required],
      visible: [null],
    });
  };

  fetchItems() {
    this.faqService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.faqItems = data;
      this.loading = false;
    });
  }

  createFaq() {

    if (this.editMode === true) {
      this.updateFaq();
      this.closeModal();
      return;
    }

    this.faqService.create(this.editForm.value)
      .then(() => {
        this.handleMessage('create');
        this.closeModal();
      });
  }

  deleteFaq(item: any) {
    this.faqService.delete(item.key)
      .then(() => {
        this.handleMessage('delete');
      })
      .catch(err => console.log(err));
  }

  updateFaq(): void {

    const data = {
      title: this.editForm.value.title,
      content: this.editForm.value.content,
      visible: this.editForm.value.visible
    };

    this.faqService.update(this.currentFaq.key, data)
      .then(() => {
        this.handleMessage('update');
      })
      .catch(err => console.log(err));
  }


  openModal(template: TemplateRef<any>, type: string, item?: any) {

    if (type === 'add') {
      this.editMode = false;
      this.editForm.reset();
    }

    if (type === 'edit') {
      this.editMode = true;
      this.currentFaq = item;
      this.editForm.patchValue({
        title: item.title,
        content: item.content,
        visible: item.visible
      });
    }
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef?.hide();
    this.editForm.reset();
  }

  handleMessage(type: string) {
    this.showMessage = true;
    switch (type) {
      case 'create':
        this.message = this.content.itemCreated;
        break;
      case 'delete':
        this.message = this.content.itemDeleted;
        break;
      default:
        this.message = this.content.itemUpdated;
    }
    setTimeout(() => {
      this.showMessage = false;
    }, 1500);
  }

  hideMessage() {
    console.log('2000');
    this.showMessage = false;
    console.log(this.showMessage);
  }

  content = {
    itemCreated: {
      text: "Item aangemaakt!",
      icon: "✅"
    },
    itemDeleted: {
      text: "Item verwijderd",
      icon: "🗑️"
    },
    itemUpdated: {
      text: "Item aangepast!",
      icon: "🙌"
    },
    table: {
      question: "Vraag",
      answer: "Antwoord",
      visible: "Zichtbaar",
      actions: "Acties",
      edit: "Bewerk",
      delete: "Verwijder",
      add: "Voeg toe",
      noItems: "Nog geen items",
      addItem: "Eentje toevoegen?"
    }
  };

};