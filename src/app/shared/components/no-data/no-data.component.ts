import { Component, OnInit } from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: `app-no-data`,
  templateUrl: `./no-data.component.html`,
  styleUrls: [`./no-data.component.scss`]
})
export class NoDataComponent implements OnInit {

  lottiePath = `/assets/animations/no-data.json`;

  options: AnimationOptions = {
    loop: true,
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: `500px`,
  };

  ngOnInit(): void {
    this.options = {
      ...this.options,
      path: this.lottiePath,
    };
  }

}
