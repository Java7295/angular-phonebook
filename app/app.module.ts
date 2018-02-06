import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactItemComponent } from './contact-item.component';
import { ContactItemListComponent } from './contact-item-list.component';
import { ContactItemFormComponent } from './contact-item-form.component';
import { ContactItemService } from './contact-item.service';
import { MockXHRBackend } from './mock-xhr-backend';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    ContactItemComponent,
    ContactItemListComponent,
    ContactItemFormComponent
   ],
  providers: [
    ContactItemService,
    { provide: XHRBackend, useClass: MockXHRBackend }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}