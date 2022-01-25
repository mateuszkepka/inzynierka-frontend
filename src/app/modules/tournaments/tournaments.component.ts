import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Tournament, TournamentStatus } from "src/app/shared/interfaces/interfaces";

import { ApiService } from "src/app/services/api.service";
import { LottieHeaderTexts } from "src/app/shared/components/lottie-header/lottie-header.component";
import { cloneDeep } from "lodash";

@Component({
    selector: `app-tournaments`,
    templateUrl: `./tournaments.component.html`,
    styleUrls: [`./tournaments.component.scss`],
})
export class TournamentsComponent implements OnInit {
    lottiePath = `/assets/animations/podium.json`;
    tournaments: Tournament[];

    statusOptions: { status: string; label: string }[];

    status = TournamentStatus.UPCOMING;

    headerTexts: LottieHeaderTexts = {
        upperBoldText: `Lorem ipsum`,
        lowerNormalText:  `Lorem ipsum`
    };

    constructor(
        private readonly apiService: ApiService,
    ) {}

    async ngOnInit() {
        this.setTournamentStatuses();
        await this.getTournaments();
    }

    async getTournaments() {
        const tournaments = await this.apiService.getAllTournaments(this.status).catch(() => []);
        const promises = tournaments.map(async (tournament) => {
            const res = await this.apiService.getTournamentTeams(tournament.tournamentId).catch(() => []);
            const checkedIn = res.filter((team) => team.status === `checked`);
            return {...tournament, checkedIn: checkedIn.length };
        });
        this.tournaments = await Promise.all(promises);
    }

    setTournamentStatuses() {
        this.statusOptions = Object.keys(TournamentStatus).map((key) => ({
          status: TournamentStatus[key],
          label: this.toProperCase(TournamentStatus[key])
        }));
    }

    toProperCase(text: string) {
        return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
    }
}
