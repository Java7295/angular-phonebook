import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          if (request.url.indexOf('contactitems?name=') >= 0 || request.url === 'contactitems') {
            var name;
            if (request.url.indexOf('?') >= 0) {
              name = request.url.split('=')[1];
              if (name === 'undefined') name = '';
            }
            var contactItems;
            if (name) {
              contactItems = this._contactItems.filter(contactItem => contactItem.name === name);
            } else {
              contactItems = this._contactItems;
            }
            responseOptions = new ResponseOptions({
              body: { contactItems: JSON.parse(JSON.stringify(contactItems)) },
              status: 200
            });
          } else {
            var id = parseInt(request.url.split('/')[1]);
            contactItems = this._contactItems.filter(contactItem => contactItem.id === id);
            responseOptions = new ResponseOptions({
              body: JSON.parse(JSON.stringify(contactItems[0])),
              status: 200
            });
          }
          break;
        case RequestMethod.Post:
          var contactItem = JSON.parse(request.text().toString());
          contactItem.id = this._getNewId();
          this._contactItems.push(contactItem);
          responseOptions = new ResponseOptions({ status: 201 });
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this._deleteContactItem(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });
    return { response };
  }

  _deleteContactItem(id) {
    var contactItem = this._contactItems.find(contactItem => contactItem.id === id);
    var index = this._contactItems.indexOf(contactItem);
    if (index >= 0) {
      this._contactItems.splice(index, 1);
    }
  }

  _getNewId() {
    if (this._contactItems.length > 0) {
      return Math.max.apply(Math, this._contactItems.map(contactItem => contactItem.id)) + 1;
    } else {
      return 1;
    }
  }

  _contactItems = [
		{
			"id": 0,
			"name": "Add New",
			"phone": null,
			"email": null,
			"birthday": null,
			"avatar": "/media/add_user.jpg"
		},
		{
			"id": 1,
			"name": "Erin Eyeball",
			"phone": "(123) 456-7890",
			"email": "one.eye.open@ilumin.com",
			"birthday": "01/01/1980",
			"avatar": "http://lorempixel.com/300/300/people/1"
		},
		{
			"id": 2,
			"name": "Johnathan Homebody",
			"phone": "(123) 456-7890",
			"email": "stayathomedad@wheresmom.com",
			"birthday": "01/01/1980",
			"avatar": "http://lorempixel.com/300/300/people/2"
		},
		{
			"id": 3,
			"name": "Cletus Weatherly",
			"phone": "(123) 456-7890",
			"email": "cletus@netscape.com",
			"birthday": "01/01/1980",
			"avatar": "http://lorempixel.com/300/300/people/3"
		},
		{
			"id": 4,
			"name": "Shirley Travels",
			"phone": "(123) 456-7890",
			"email": "shirley.travels@cityscape.com",
			"birthday": "01/01/1980",
			"avatar": "http://lorempixel.com/300/300/people/4"
		},
		{
			"id": 5,
			"name": "John Watcher",
			"phone": "(123) 456-7890",
			"email": "train.photo.junkie@photonow.net",
			"birthday": "01/01/1980",
			"avatar": "http://lorempixel.com/300/300/people/5"
		},
		{
			"id": 6,
			"name": "Curly Jenny",
			"phone": "(123) 456-7890",
			"email": "littlewhitebows@aol.com",
			"birthday": "01/01/1980",
			"avatar": "http://lorempixel.com/300/300/people/6"
		},
		{
			"id": 8,
			"name": "Old Man Jenkins",
			"phone": "(123) 456-7890",
			"email": "wiseman@hotmail.com",
			"birthday": "01/01/1980",
			"avatar": "http://lorempixel.com/300/300/people/8"
		},
		{
			"id": 9,
			"name": "Becky",
			"phone": "(123) 456-7890",
			"email": "whatsoverthere@myspace.com",
			"birthday": "01/01/1980",
			"avatar": "http://lorempixel.com/300/300/people/9"
		}
  ];
}
