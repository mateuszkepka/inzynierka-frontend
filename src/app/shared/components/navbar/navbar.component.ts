import { Component, OnInit } from '@angular/core';
import { faAt, faGamepad, faSitemap, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: `app-navbar`,
  templateUrl: `./navbar.component.html`,
  styleUrls: [`./navbar.component.scss`]
})
export class NavbarComponent implements OnInit {

  faTrophy = faTrophy;
  faSitemap = faSitemap;
  faGamepad = faGamepad;
  faAt = faAt;

  constructor() { }

  ngOnInit(): void {
  }

}
