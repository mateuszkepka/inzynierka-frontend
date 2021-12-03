import { Action, State, StateContext } from "@ngxs/store";

import { Injectable } from "@angular/core";
import { SetCurrentTeam } from "./current-team.actions";
import { Team } from "../shared/interfaces/interfaces";

export interface CurrentTeamStateModel {
    team: Team | undefined;
}

@State<CurrentTeamStateModel>({
    name: `currentTeam`,
    defaults: {
        team: undefined,
    }
})
@Injectable()
export class CurrentTeamState {
    @Action(SetCurrentTeam)
    setCurrentTeam(ctx: StateContext<CurrentTeamStateModel>, { team }: SetCurrentTeam) {
        ctx.patchState({
            team
        });
    }
}
