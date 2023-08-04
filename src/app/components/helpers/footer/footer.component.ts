import { Component } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
}
