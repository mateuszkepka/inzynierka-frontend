import { RouterModule, Routes } from "@angular/router";

import { EditTeamComponent } from "./edit-team/edit-team.component";
import { InvitePlayersComponent } from "./invite-players/invite-players.component";
import { NgModule } from "@angular/core";
import { TeamComponent } from "./team.component";

const routes: Routes = [
    {
        path: `:id`,
        component: TeamComponent,
    },
    {
        path: `:id/invite-players`,
        component: InvitePlayersComponent,
    },
    {
        path: `:id/edit`,
        component: EditTeamComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamRoutingModule {}
