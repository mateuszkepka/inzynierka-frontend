import { RouterModule, Routes } from "@angular/router";

import { CreateTournamentComponent } from "./create-tournament.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: ``,
        component: CreateTournamentComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateTournamentRoutingModule { }
