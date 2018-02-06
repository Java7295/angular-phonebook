import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'contact-item',
  templateUrl: 'app/contact-item.component.html',
  styleUrls: ['app/contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contactItem;
  @Output() details = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  onDetails() { this.details.emit(this.contactItem); }
  onAdd() { this.add.emit(this.contactItem); }
  onEdit() { this.edit.emit(this.contactItem); }
  onDelete() { this.delete.emit(this.contactItem); }
}
