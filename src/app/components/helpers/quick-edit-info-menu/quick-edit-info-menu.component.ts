import { outputAst } from '@angular/compiler';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-quick-edit-info-menu',
  templateUrl: './quick-edit-info-menu.component.html',
  styleUrls: ['./quick-edit-info-menu.component.scss'],
})
export class QuickEditInfoMenuComponent {
  @Input() title: string;
  @Input() editLink: string;
  @Input() itemName: string;

  @Input() isActiveItem: boolean;
  @Input() difficulty: string;
  @Input() cefrEquiv: string;
  @Input() itemType: any;

  @Output() softDelete = new EventEmitter<void>();
  @Output() toggleActive = new EventEmitter<boolean>();

  @Input() editIcon: IconDefinition;
  @Input() deleteIcon: IconDefinition;

  softDeleteItem() {
    this.softDelete.emit();
    console.log('emitted');
  }

  toggleActiveItem() {
    console.log('emitovano', this.isActiveItem);
    this.toggleActive.emit(this.isActiveItem);
  }
}
