import { Component, OnInit } from '@angular/core';

import { RefreshTokenService } from './services/refresh-token.service';

@Component({
  selector: `app-root`,
  templateUrl: `./app.component.html`,
  styleUrls: [`./app.component.scss`]
})
export class AppComponent implements OnInit {
  title = `inzynierka-frontend`;

  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  ngOnInit() {
    this.refreshTokenService.refreshCookies();
  }
}
