import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = this.authService.isLoggedIn();
  apiUrl = environment.API_URL;
  tokenData: any;
  user: User;
  userAvatarPath: string;

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.tokenData = this.authService.getTokenData();

      this.usersService.getUserById(this.tokenData.id).subscribe((data) => {
        this.user = data;
        this.userAvatarPath = `${this.apiUrl}/${this.user.avatarPath}`;
      });
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {}
}
