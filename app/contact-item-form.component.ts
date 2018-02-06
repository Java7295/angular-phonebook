import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { ContactItemService } from './contact-item.service';

@Component({
  selector: 'contact-item-form',
  templateUrl: 'app/contact-item-form.component.html',
  styleUrls: ['app/contact-item-form.component.css']
})
export class ContactItemFormComponent {
  form;

	public id: string;
	public name: string;
	public phone: string;
	public email: string;
	public birthday: string;
	public avatar: string;

  constructor(
    	private formBuilder: FormBuilder,
    	private contactItemService: ContactItemService,
			private route: ActivatedRoute,
    	private router: Router
    )
    {
    	this.route.queryParams.subscribe(params => {
      	this.id = params["id"];
      	this.name = params["name"];
      	this.phone = params["phone"];
      	this.email = params["email"];
      	this.birthday = params["birthday"];
      	this.avatar = params["avatar"];
      });
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(this.name,
      	Validators.compose([
        	Validators.required,
        	Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      	])),
      phone: this.formBuilder.control(this.phone, Validators.compose([
        Validators.required
      ])),
      email: this.formBuilder.control(this.email, Validators.compose([
        Validators.required
      ])),
      birthday: this.formBuilder.control(this.birthday, Validators.compose([
        Validators.required
      ])),
      avatar: this.formBuilder.control(this.avatar, Validators.compose([
        Validators.required
      ])),
    });
  }

  onSubmit(contactItem) {
    this.contactItemService.add(contactItem)
      .subscribe(() => {
      	this.router.navigate(['/all']);
      });
  }
}
