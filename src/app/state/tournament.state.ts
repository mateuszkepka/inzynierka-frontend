import { Action, State, StateContext } from "@ngxs/store";

import { Injectable } from "@angular/core";
import { SetTournament } from "./tournament.actions";
import { Tournament } from "../shared/interfaces/interfaces";

export interface TournamentStateModel {
    tournament: Tournament | undefined;
}

@State<TournamentStateModel>({
    name: `tournament`,
    defaults: {
        tournament: undefined,
    }
})
@Injectable()
export class TournamentState {
    @Action(SetTournament)
    setTournament(ctx: StateContext<TournamentStateModel>, { tournament }: SetTournament) {
        ctx.patchState({
            tournament,
        });
    }
}
