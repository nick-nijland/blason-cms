import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FaqService } from './faq.service';
import { Faq } from './faq.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faq: Faq;
  modalRef?: BsModalRef;
  editForm: FormGroup;
  editMode: boolean = false;
  faqItems: any;
  currentFaq: Faq;
  message: string = 'null';

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
      visible: [null, Validators.required],
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
      //console.log(this.faqItems);
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
        console.log('Created new item successfully!');
        this.closeModal();
      });
  }


  deleteFaq(item: any) {
    this.faqService.delete(item.key)
      .then(() => {
        console.log('asijdasij');
      })
      .catch(err => console.log(err));
  }

  updateFaq(): void {
    const data = {
      title: this.currentFaq.title,
      content: this.currentFaq.content,
      visible: this.currentFaq.visible
    };

    this.faqService.update(this.currentFaq.key, data)
      .then(() => this.message = 'Updated')
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

  content = {
    table: {
      question: "Vraag",
      answer: "Antwoord",
      visible: "Zichtbaar",
      actions: "Acties",
      edit: "Bewerk",
      delete: "Verwijder",
      add: "Voeg toe"
    }
  };

};