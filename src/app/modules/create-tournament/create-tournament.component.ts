import { AddPrizeInput, CreateTournamentInput, Format, Tournament } from "src/app/shared/interfaces/interfaces";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IconDefinition, faTrophy } from "@fortawesome/free-solid-svg-icons";

import { ApiService } from "src/app/services/api.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { omit } from "lodash";

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
    gamePresets: Format[] = [];

    faTrophy: IconDefinition = faTrophy;

    form = new FormGroup({
        name: new FormControl(``, [Validators.required]),
        numberOfPlayers: new FormControl(null, [Validators.required]),
        numberOfTeams: new FormControl(null, [Validators.required]),
        numberOfMaps: new FormControl(null, [Validators.required]),
        registerStartDate: new FormControl(``, [Validators.required]),
        registerEndDate: new FormControl(``, [Validators.required]),
        tournamentStartDate: new FormControl(``, [Validators.required]),
        endingHour: new FormControl(null, [Validators.required]),
        description: new FormControl(``, [Validators.required]),
        format: new FormControl(``, [Validators.required]),
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
        const requestBody = {
            ...omit(this.form.value, [`endingHour`]),
            endingHour: this.form.value.endingHour.getHours(),
            endingMinutes: this.form.value.endingHour.getMinutes(),
        };
        const response = await this.apiService.createTournament(requestBody as CreateTournamentInput);
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

    async ngOnInit() {
        await this.getGamePresets();
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

    async getGamePresets() {
        this.gamePresets = await this.apiService.getFormats();
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
