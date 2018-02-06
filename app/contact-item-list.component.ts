import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { ContactItemService } from './contact-item.service';

@Component({
  selector: 'contact-item-list',
  templateUrl: 'app/contact-item-list.component.html',
  styleUrls: ['app/contact-item-list.component.css']
})
export class ContactItemListComponent {
	name = '';
  contactItems = [];
  paramsSubscription;

  constructor(
    private contactItemService: ContactItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {
        let name = params['name'];
        if(name.toLowerCase() === 'all') {
          name = '';
        }
        this.getContactItems(name);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onContactItemDelete(contactItem) {
    this.contactItemService.delete(contactItem)
      .subscribe(() => {
        this.getContactItems(this.name);
      });
  }

  getContactItems(name) {
    this.name = name;
    this.contactItemService.get(name)
      .subscribe(contactItems => {
        this.contactItems = contactItems;
      });
  }

  onContactItemDetails(contactItem) {
  	let navigationExtras: NavigationExtras = {
  		queryParams: {
  			"id": contactItem.id,
  			"name": contactItem.name,
  			"phone": contactItem.phone,
  			"email": contactItem.email,
  			"birthday": contactItem.birthday,
  			"avatar": contactItem.avatar
  		}
  	};
		this.router.navigate(["add"], navigationExtras);
  };
}
