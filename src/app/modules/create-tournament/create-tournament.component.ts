import { AddPrizeInput, Tournament } from "src/app/shared/interfaces/interfaces";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IconDefinition, faTrophy } from "@fortawesome/free-solid-svg-icons";

import { ApiService } from "src/app/services/api.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

interface GamePreset {
    name: string;
    value: string;
}

@Component({
    selector: `app-create-tournament`,
    templateUrl: `./create-tournament.component.html`,
    styleUrls: [`./create-tournament.component.scss`]
})
export class CreateTournamentComponent implements OnInit, OnDestroy {
    registerStartMinDate = new Date();
    registerEndMinDate = new Date();
    tournamentStartMinDate = new Date();
    tournamentEndMinDate = new Date();

    subscriptions: Subscription[] = [];
    gamePresets: GamePreset[] = [
        {
            name: `Preset 1`,
            value: `pre-1`,
        },
        {
            name: `Preset 2`,
            value: `pre-2`,
        },
        {
            name: `Preset 3`,
            value: `pre-3`,
        }
    ];

    faTrophy: IconDefinition = faTrophy;

    form = new FormGroup({
        name: new FormControl(``, [Validators.required]),
        numberOfPlayers: new FormControl(null, [Validators.required]),
        numberOfTeams: new FormControl(null, [Validators.required]),
        registerStartDate: new FormControl(``, [Validators.required]),
        registerEndDate: new FormControl(``, [Validators.required]),
        tournamentStartDate: new FormControl(``, [Validators.required]),
        tournamentEndDate: new FormControl(``, [Validators.required]),
        description: new FormControl(``, [Validators.required]),
        gamesPreset: new FormControl(``, [Validators.required]),
        prize: new FormGroup({
            currency: new FormControl(``, [Validators.required]),
            distribution: new FormControl(``, [Validators.required]),
        }),
        gameId: new FormControl(1, [Validators.required]),
    });

    constructor(
        private readonly apiService: ApiService,
        private readonly router: Router,
        private readonly notificationsService: NotificationsService
    ) {
    }

    async onSubmit() {
        const response = await this.apiService.createTournament(this.form.value);
        const addPrizeResponse = await this.addTournamentPrize(response);

        if (response && addPrizeResponse) {
            this.notificationsService.addNotification({
                severity: `success`,
                summary: `Success!`,
                detail: `Tournament has been created.`
            });
            void this.router.navigate([`/tournaments/${response.tournamentId}`]);
            return;
        }

        this.notificationsService.addNotification({
            severity: `error`,
            summary: `Error!`,
            detail: `Something went wrong.`
        });
    }

    ngOnInit() {
        this.subscriptions.push(
            this.form.controls
                .registerStartDate
                .valueChanges
                .subscribe((val) => this.setRegisterEndMinDate(val)),
            this.form.controls
                .registerEndDate
                .valueChanges
                .subscribe((val) => this.setTournamentStartMinDate(val)),
            this.form.controls
                .tournamentStartDate
                .valueChanges
                .subscribe((val) => this.setTournamentEndMinDate(val)),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    async addTournamentPrize(tournament: Tournament) {
        const input: AddPrizeInput = {
            tournamentId: tournament.tournamentId,
            distribution: this.form.value.prize.distribution,
            currency: this.form.value.prize.currency || `None`,
        };

        return await this.apiService.addPrize(input);
    }

    setRegisterEndMinDate(date: Date) {
        this.registerEndMinDate = date;
    }

    setTournamentStartMinDate(date: Date) {
        this.tournamentStartMinDate = date;
    }

    setTournamentEndMinDate(date: Date) {
        this.tournamentEndMinDate = date;
    }
}
