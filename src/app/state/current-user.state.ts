import { Action, State, StateContext } from "@ngxs/store";

import { Injectable } from "@angular/core";
import { SetCurrentUser } from "./current-user.actions";
import { User } from "../shared/interfaces/interfaces";

export interface CurrentUserStateModel {
    currentUser: User | undefined;
}

@State<CurrentUserStateModel>({
    name: `currentUser`,
    defaults: {
        currentUser: undefined,
    }
})
@Injectable()
export class CurrentUserState {
    @Action(SetCurrentUser)
    setCurrentUser(ctx: StateContext<CurrentUserStateModel>, { currentUser }: SetCurrentUser) {
        const currentState = ctx.getState();
        ctx.patchState({
            ...currentState.currentUser,
            currentUser
        });
    }
}
