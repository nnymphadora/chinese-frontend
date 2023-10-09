import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackbarService } from 'src/app/services/mat-snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment.development';
import {
  faPenToSquare,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { SnackbarMessage } from 'src/app/enums/snackbar-message';

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
  uploadedAvatarUrl: string;
  uploadedAvatar: File;
  existingUsernames: string[];
  editForm: FormGroup;
  passwordChangeForm: FormGroup;

  editIcon = faPenToSquare;
  saveIcon = faCheck;
  cancelIcon = faXmark;

  snackbarClasses: string[] = ['snackbar', 'snackbar-pink'];
  editingPassword: boolean = false;

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.tokenData = this.authService.getTokenData();
      this.getUserData(this.tokenData.username);
    }
    this.createPasswordChangeForm();
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
      !!this.uploadedAvatarUrl
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
              SnackbarMessage.UsernameTaken,
              'OK',
              this.snackbarClasses
            );
            return;
          }
        }

        if (this.uploadedAvatar) {
          const formData: FormData = new FormData();
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
      } else {
        this.snackBarService.openSnackBar(
          SnackbarMessage.WrongInput,
          'OK',
          this.snackbarClasses
        );
      }
    }
    this.router.navigateByUrl('/');
  }

  saveUser() {
    this.user.username = this.editForm.value.username;
    this.user.email = this.editForm.value.email;

    if (this.uploadedAvatarUrl) {
      this.user.avatarPath = this.uploadedAvatarUrl;
    }
    this.authService.updateUserInfo(this.user).subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('chinese-token', data.token);
        window.location.href = '/';
      } else {
        this.snackBarService.openSnackBar(
          SnackbarMessage.Error,
          undefined,
          [...this.snackbarClasses, 'no-action'],
          3000
        );
      }
    });
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }

  showPasswordChangeForm() {
    this.editingPassword = true;
  }

  createPasswordChangeForm() {
    this.passwordChangeForm = this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmitPassword() {
    if (this.passwordChangeForm.valid) {
      const user = this.user;
      user.password = this.passwordChangeForm.get('currentPassword').value;
      this.authService.confirmPassword(user).subscribe((data: any) => {
        if (data.success) {
          this.updateUserPassword();
        } else {
          this.snackBarService.openSnackBar(
            SnackbarMessage.WrongPassword,
            'OK',
            this.snackbarClasses
          );
        }
      });
    }
  }

  onCancelPassword() {
    this.editingPassword = false;
  }

  updateUserPassword() {
    this.user.password = this.passwordChangeForm.get('newPassword').value;
    this.user.confirmPassword =
      this.passwordChangeForm.get('confirmPassword').value;
    this.authService.updateUserPassword(this.user).subscribe((data: any) => {
      const message = data.success
        ? SnackbarMessage.Success
        : SnackbarMessage.Error;
      this.snackBarService.openSnackBar(
        message,
        undefined,
        [...this.snackbarClasses, 'no-action'],
        3000
      );
      if (data.success) {
        this.editingPassword = false;
      }
    });
  }

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBarService: MatSnackbarService
  ) {}
}
