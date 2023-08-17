import { Component } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { NewsletterSub } from 'src/app/models/NewsletterSub';
import { NewsletterSubService } from 'src/app/services/newsletter-sub.service';

import {
  faSquareFacebook,
  faSquareInstagram,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faPaperPlane = faPaperPlane;
  faSquareFacebook = faSquareFacebook;
  faSquareInstagram = faSquareInstagram;
  faLinkedin = faLinkedin;
  faGithub = faGithub;

  subEmail: NewsletterSub = new NewsletterSub();

  saveEmail() {
    this.newsLetterSubService.insertSubscribedEmail(this.subEmail).subscribe(
      (data) => {
        this.snackBar.open('Uspiješno!', 'OK', {
          duration: 3000, // Display duration in milliseconds
        });
      },
      (error) => {
        this.snackBar.open('Došlo je do greške!', 'OK', {
          duration: 3000, // Display duration in milliseconds
        });
      }
    );
  }

  constructor(
    private newsLetterSubService: NewsletterSubService,
    private snackBar: MatSnackBar
  ) {}
}
