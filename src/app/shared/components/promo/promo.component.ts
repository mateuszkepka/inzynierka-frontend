import { Component, Input, OnInit } from '@angular/core';

export interface PromoTexts {
  upperText: string;
  lowerText: string;
}

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  @Input() imagePath: string;
  @Input() promoTexts: PromoTexts;
  @Input() imageOnLeft: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
