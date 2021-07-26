import { Component, Input, OnInit } from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';

export interface LottieHeaderTexts {
  upperBoldText: string;
  lowerNormalText: string;
}

@Component({
  selector: 'app-lottie-header',
  templateUrl: './lottie-header.component.html',
  styleUrls: ['./lottie-header.component.scss']
})

export class LottieHeaderComponent implements OnInit {
  @Input() lottiePath: string;
  @Input() headerTexts: LottieHeaderTexts;

  options: AnimationOptions = {
    loop: true,
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: `500px`,
  }

  constructor() { }

  ngOnInit(): void {
    this.options = {
      ...this.options,
      path: this.lottiePath,
    }
  }

}
