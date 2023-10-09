import { Component, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { NewsletterSub } from 'src/app/models/NewsletterSub';
import { NewsletterSubService } from 'src/app/services/newsletter-sub.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  faSquareFacebook,
  faSquareInstagram,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { MatSnackbarService } from 'src/app/services/mat-snackbar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faPaperPlane = faPaperPlane;
  faSquareFacebook = faSquareFacebook;
  faSquareInstagram = faSquareInstagram;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  emailForm: FormGroup;

  subEmail: NewsletterSub = new NewsletterSub();

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  saveEmail() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value;

      this.newsLetterSubService
        .insertSubscribedEmail(email)
        .subscribe((data: any) => {
          if (data.affectedRows > 0) {
            this.snackBarService.openSnackBar(
              'Uspiješno!',
              undefined,
              ['snackbar', 'snackbar-pink', 'no-action'],
              3000
            );
          } else {
            this.snackBarService.openSnackBar(
              'Došlo je do greške!',
              undefined,
              ['snackbar', 'snackbar-pink', 'no-action'],
              3000
            );
          }
        });
    } else {
      this.snackBarService.openSnackBar(
        'Pogrešan unos!',
        undefined,
        ['snackbar', 'snackbar-pink', 'no-action'],
        3000
      );
    }
  }

  constructor(
    private newsLetterSubService: NewsletterSubService,

    private formBuilder: FormBuilder,
    private snackBarService: MatSnackbarService
  ) {}
}
