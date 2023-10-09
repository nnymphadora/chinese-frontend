import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment.development';
import { SmallScreenNavMenuComponent } from '../small-screen-nav-menu/small-screen-nav-menu.component';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserInfoDialogComponent } from '../view-user-info-dialog/view-user-info-dialog.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterContentChecked {
  isLoggedIn: boolean = this.authService.isLoggedIn();
  apiUrl = environment.API_URL;
  tokenData: any;
  user: User = new User();
  userAvatarPath: string;
  openMenuBtn = faBars;
  snackbarClasses: string[] = ['snackbar', 'snackbar-blue', 'no-action'];

  @ViewChild(SmallScreenNavMenuComponent)
  menuComponent: SmallScreenNavMenuComponent;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.tokenData = this.authService.getTokenData();
      this.getUserData(this.tokenData.username);
    }
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  getUserData(username: string) {
    this.usersService.getUserByUsername(username).subscribe((data) => {
      this.user = data;
      this.userAvatarPath = `${this.apiUrl}/${this.user.avatarPath}`;
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  openUserInfo() {
    const dialogRef = this.dialog.open(ViewUserInfoDialogComponent, {
      panelClass: ['border-radius-20-px'],
      data: this.user,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.router.navigateByUrl(`/${this.user.username}/edit`);
      }
    });
  }

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngAfterViewInit(): void {}
}
