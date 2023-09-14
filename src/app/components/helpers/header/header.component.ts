import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment.development';
import { SmallScreenNavMenuComponent } from '../small-screen-nav-menu/small-screen-nav-menu.component';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = this.authService.isLoggedIn();
  apiUrl = environment.API_URL;
  tokenData: any;
  user: User = new User();
  userAvatarPath: string;
  openMenuBtn = faBars;

  @ViewChild(SmallScreenNavMenuComponent)
  menuComponent: SmallScreenNavMenuComponent;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.tokenData = this.authService.getTokenData();
      this.getUserData(this.tokenData.username);
    }
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

  toggleMenu() {
    console.log('click');

    // this.menuTrigger.openMenu();
  }

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngAfterViewInit(): void {}
}
