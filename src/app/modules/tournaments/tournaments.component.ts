import { Component, OnInit } from "@angular/core";

import { ApiService } from "src/app/services/api.service";
import { LottieHeaderTexts } from "src/app/shared/components/lottie-header/lottie-header.component";
import { Tournament } from "src/app/shared/interfaces/interfaces";

@Component({
    selector: `app-tournaments`,
    templateUrl: `./tournaments.component.html`,
    styleUrls: [`./tournaments.component.scss`],
})
export class TournamentsComponent implements OnInit {
    lottiePath = `/assets/animations/podium.json`;
    tournaments: Tournament[];

    headerTexts: LottieHeaderTexts = {
        upperBoldText: `Lorem ipsum`,
        lowerNormalText:  `Lorem ipsum`
    };

    constructor(
        private readonly apiService: ApiService
    ) {}

    async ngOnInit() {
        this.tournaments = await this.apiService.getAllTournaments();
    }
}
