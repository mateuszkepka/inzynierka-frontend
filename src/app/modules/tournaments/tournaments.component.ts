import { Component } from "@angular/core";
import { LottieHeaderTexts } from "src/app/shared/components/lottie-header/lottie-header.component";

@Component({
    selector: `app-tournaments`,
    templateUrl: `./tournaments.component.html`,
    styleUrls: [`./tournaments.component.scss`],
})
export class TournamentsComponent {
    lottiePath = `/assets/animations/podium.json`;

    headerTexts: LottieHeaderTexts = {
        upperBoldText: `Lorem ipsum`,
        lowerNormalText:  `Lorem ipsum`
    };

    tournaments = [
        {
            title: `tournament title`,
            description: `torunament description`,
            buttonLabel: `Show details`,
        },
        {
            title: `tournament title`,
            description: `torunament description`,
            buttonLabel: `Show details`,
        },
        {
            title: `tournament title`,
            description: `torunament description`,
            buttonLabel: `Show details`,
        },
        {
            title: `tournament title`,
            description: `torunament description`,
            buttonLabel: `Show details`,
        },
        {
            title: `tournament title`,
            description: `torunament description`,
            buttonLabel: `Show details`,
        },
    ];
}
