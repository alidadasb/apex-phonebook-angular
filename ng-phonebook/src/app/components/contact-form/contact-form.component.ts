import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../services/contacts.service";
import {NgForm} from "@angular/forms";
import {Contact} from '../contact-list/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  model = this.createNew();
  submitted = false;
  btnName = 'Submit';

  constructor(private contactService: ContactService ) { }

  ngOnInit(): void {}

  createNew() {
    return {
      email: '',
      firstName: '',
      lastName: ''
    };
  }

  onSubmit(contactForm: NgForm) {
    this.submitted = true;

    this.contactService.addContact(this.model)
      .subscribe(contact => {
        console.log('object saved', contact);
        this.model = this.createNew();
        this.submitted = false;
        contactForm.resetForm();
      });

    console.log('submitted');
  }

  get diagnostic() { return JSON.stringify(this.model); }

}
