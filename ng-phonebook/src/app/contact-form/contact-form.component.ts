import { Component, OnInit } from '@angular/core';
import {ContactService} from "../contacts.service";
import {NgForm} from "@angular/forms";
import {Contact} from '../contacts/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  model = this.createNew();
  submitted = false;
  btnName = 'Submit';
  contacts = [];

  constructor(private contactService: ContactService ) { }

  ngOnInit(): void {
    this.readAll();
  }

  private readAll() {
    return this.contactService.loadAll().subscribe((list) => {
      this.contacts = list;
    });
  }

  createNew() {
    return {};
  }

  onSubmit(contactForm: NgForm) {
    this.submitted = true;

    this.contactService.addContact(this.model)
      .subscribe(contact => {
        this.contacts.push(contact);
        console.log('object saved', contact);
        this.model = this.createNew();
        this.submitted = false;
        contactForm.resetForm();
      });

    console.log('submitted');
  }

  get diagnostic() { return JSON.stringify(this.model); }

}
