import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quick-edit-info-menu',
  templateUrl: './quick-edit-info-menu.component.html',
  styleUrls: ['./quick-edit-info-menu.component.scss'],
})
export class QuickEditInfoMenuComponent {
  tokenData: any = this.authService.getTokenData();
  isAdmin: boolean = this.tokenData.isAdmin;

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
  }

  toggleActiveItem() {
    this.toggleActive.emit(this.isActiveItem);
  }

  constructor(private authService: AuthService) {}
}
