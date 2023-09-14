import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-small-screen-nav-menu',
  templateUrl: './small-screen-nav-menu.component.html',
  styleUrls: ['./small-screen-nav-menu.component.scss'],
})
export class SmallScreenNavMenuComponent {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu;

  @Input() isLoggedIn: boolean;
  @Output() logOut = new EventEmitter();

  onLogOut() {
    this.logOut.emit();
  }
}
