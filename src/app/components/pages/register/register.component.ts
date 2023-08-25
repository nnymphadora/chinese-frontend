import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export default class RegisterComponent {
  registerForm: FormGroup;
  existingUsernames: string[];
  user: User;

  ngOnInit(): void {
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
        avatar: [''],
      },
      { validators: this.passwordMatchValidator }
    );

    this.usersService
      .getAllUsernames()
      .subscribe((data) => (this.existingUsernames = data));
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      this.authService.register(this.user).subscribe((data: any) => {
        localStorage.setItem('chinese-token', data.token);
        this.router.navigate(['/']);
      });
    }
  }

  passwordMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  uniqueUsernameValidator(existingUsernames: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();

      if (existingUsernames.includes(value)) {
        return { nonUniqueUsername: true };
      } else {
        return null;
      }
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}
}
