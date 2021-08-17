import { Component, OnInit } from '@angular/core';
import { faFacebook, faLinkedin, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: `app-footer`,
  templateUrl: `./footer.component.html`,
  styleUrls: [`./footer.component.scss`]
})
export class FooterComponent implements OnInit {

  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faTwitch = faTwitch;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  constructor() { }

  ngOnInit(): void {
  }

}
