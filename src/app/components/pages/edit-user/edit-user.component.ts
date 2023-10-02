import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackbarService } from 'src/app/services/mat-snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  isLoggedIn: boolean = this.authService.isLoggedIn();
  tokenData: any;
  user: User = new User();
  apiUrl = environment.API_URL;
  userAvatarPath: string;
  existingUsernames: string[];
  editForm: FormGroup;
  uploadedAvatarUrl: string;
  uploadedAvatar: File;

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

    this.usersService.getAllUsernames().subscribe((data) => {
      this.existingUsernames = data;

      this.editForm = this.formBuilder.group({
        username: [this.user.username, [Validators.required]],
        email: [this.user.email, [Validators.required, Validators.email]],

        avatarPath: [this.user.avatarPath],
      });
    });
  }

  setUploadedFile(event: any) {
    const fileData = event.target.files[0];

    if (fileData) {
      this.uploadedAvatar = fileData;
      this.previewUploadedAvatar();
    }
  }

  previewUploadedAvatar() {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.uploadedAvatarUrl = e.target.result;
    };

    if (this.uploadedAvatar) {
      reader.readAsDataURL(this.uploadedAvatar);
    }
  }

  isUsernameUnique(username: string, existingUsernames: string[]): boolean {
    return !existingUsernames.includes(username);
  }

  hasFormChanged(): boolean {
    const formValue = this.editForm.value;
    return (
      formValue.username !== this.user.username ||
      formValue.email !== this.user.email ||
      formValue.avatarPath !== this.user.avatarPath
    );
  }

  onSubmit() {
    if (this.hasFormChanged()) {
      if (this.editForm.valid) {
        if (this.editForm.value.username !== this.user.username) {
          if (
            !this.isUsernameUnique(
              this.editForm.value.username,
              this.existingUsernames
            )
          ) {
            this.snackBarService.openSnackBar(
              'Korisničko ime je zauzeto.',
              'OK',
              ['snackbar', 'snackbar-pink']
            );
            return;
          }
          if (this.uploadedAvatar) {
            let formData: FormData = new FormData();
            formData.append('img', this.uploadedAvatar);
            this.usersService
              .saveAvatarImg(formData)
              .subscribe((fileUploadResponse: any) => {
                this.uploadedAvatarUrl = fileUploadResponse.filename;
                this.saveUser();
              });
          } else {
            this.saveUser();
          }
        }
      } else {
        this.snackBarService.openSnackBar('Pogrešan unos', 'OK', [
          'snackbar',
          'snackbar-pink',
        ]);
      }
    }
  }

  saveUser() {
    this.user.username = this.editForm.value.username;
    this.user.email = this.editForm.value.email;
    console.log('auth service: ', this.user);
    if (this.uploadedAvatarUrl) {
      this.user.avatarPath = this.uploadedAvatarUrl;
    }
    this.authService.updateUserInfo(this.user).subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('chinese-token', data.token);
        window.location.href = '/';
      } else {
        this.snackBarService.openSnackBar(
          'Došlo je do greške!',
          undefined,
          ['snackbar', 'snackbar-pink', 'no-action'],
          3000
        );
      }
    });
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBarService: MatSnackbarService
  ) {}
}
