import { RouterModule, Routes } from "@angular/router";

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamRoutingModule {}
