import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarMessage } from 'src/app/enums/snackbar-message';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackbarService } from 'src/app/services/mat-snackbar.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  apiUrl = environment.API_URL;
  loginForm: FormGroup;
  snackbarClasses: string[] = ['snackbar', 'snackbar-blue', 'no-action'];

  user: User = new User();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      this.login(this.user);
    }
  }

  login(user: any) {
    this.authService.login(user).subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('chinese-token', data.token);
        window.location.href = '/';
      } else {
        this.snackBarService.openSnackBar(
          SnackbarMessage.WrongInput,
          undefined,
          this.snackbarClasses,
          3000
        );
      }
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBarService: MatSnackbarService
  ) {}
}
