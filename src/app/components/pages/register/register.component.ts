import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export default class RegisterComponent {
  apitUrl = environment.API_URL;
  registerForm: FormGroup;
  existingUsernames: string[];

  defaultAvatarUrl: string = `${this.apitUrl}/public/avatars/default-avatar.png`;
  uploadedAvatarUrl: string;
  uploadedAvatar: File;

  user: User = new User();

  ngOnInit(): void {
    this.usersService.getAllUsernames().subscribe((data) => {
      this.existingUsernames = data;

      this.registerForm = this.formBuilder.group(
        {
          username: [
            '',
            [Validators.required],
            [this.uniqueUsernameValidator(this.existingUsernames)],
          ],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          avatarPath: [this.defaultAvatarUrl],
        },
        { validators: this.passwordMatchValidator }
      );
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.uploadedAvatar) {
        let formData: FormData = new FormData();
        formData.append('img', this.uploadedAvatar);
        this.usersService
          .saveAvatarImg(formData)
          .subscribe((fileUploadResponse: any) => {
            this.uploadedAvatarUrl = fileUploadResponse.filename;
            this.user.avatarPath = this.uploadedAvatarUrl;
            this.saveUser();
          });
      } else {
        this.saveUser();
      }
    }
  }

  saveUser() {
    this.user = this.registerForm.value;
    this.authService.register(this.user).subscribe((data: any) => {
      console.log('front ok');
      console.log(this.user);

      localStorage.setItem('chinese-token', data.token);
      this.router.navigate(['/']);
    });
  }

  passwordMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  uniqueUsernameValidator(existingUsernames: string[]): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value.toLowerCase();

      if (existingUsernames.includes(value)) {
        return of({ nonUniqueUsername: true });
      } else {
        return of(null);
      }
    };
  }

  setUploadedFile(event: any) {
    const fileData = event.target.files[0];

    if (fileData) {
      this.uploadedAvatar = fileData;
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}
}
