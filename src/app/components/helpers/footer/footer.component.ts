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
    if (this.subEmail.email) {
      this.newsLetterSubService
        .insertSubscribedEmail(this.subEmail)
        .subscribe((data) => {
          alert("Uspiješno!")
        });
    } else {
      alert('Došlo je do greške.');
    }
  }

  constructor(private newsLetterSubService: NewsletterSubService) {}
}
