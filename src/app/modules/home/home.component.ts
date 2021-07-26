import { Component } from "@angular/core";
import { LottieHeaderTexts } from "src/app/shared/components/lottie-header/lottie-header.component";

@Component({
    selector: `app-home`,
    templateUrl: `./home.component.html`,
    styleUrls: [`./home.component.scss`]
})
export class HomeComponent {
    lottiePath = `/assets/animations/blue-trophy.json`;

    headerTexts: LottieHeaderTexts = {
        upperBoldText: `Lorem ipsum`,
        lowerNormalText:  `Lorem ipsum`
    };
}