import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RefreshTokenService } from './services/refresh-token.service';

@Component({
  selector: `app-root`,
  templateUrl: `./app.component.html`,
  styleUrls: [`./app.component.scss`]
})
export class AppComponent implements OnInit {
  title = `inzynierka-frontend`;

  constructor(
    private readonly refreshTokenService: RefreshTokenService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.refreshTokenService.refreshCookies();
  }
}
