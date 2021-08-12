import { Component } from "@angular/core";
import { LottieHeaderTexts } from "src/app/shared/components/lottie-header/lottie-header.component";
import { PromoTexts } from "src/app/shared/components/promo/promo.component";

@Component({
    selector: `app-home`,
    templateUrl: `./home.component.html`,
})
export class HomeComponent {
    lottiePath = `/assets/animations/blue-trophy.json`;

    imagePaths: string[] = [
        `/assets/images/home-page/homepage-1.png`,
        `/assets/images/home-page/homepage-2.png`,
    ];

    promoTexts: PromoTexts[] = [
        {
            upperText: `Exercitation veniam consequat sunt nostrud amet.`,
            lowerText: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.`
        },
        {
            upperText: `Exercitation veniam consequat sunt nostrud amet.`,
            lowerText: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.`
        },
    ]

    headerTexts: LottieHeaderTexts = {
        upperBoldText: `Lorem ipsum`,
        lowerNormalText:  `Lorem ipsum`
    };
}