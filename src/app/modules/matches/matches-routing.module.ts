import { RouterModule, Routes } from "@angular/router";

import { MatchDetailsComponent } from "./match-details/match-details.component";
import { MatchesComponent } from "./matches.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: ``,
        component: MatchesComponent
    },
    {
        path: `:id`,
        component: MatchDetailsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MatchesRoutingModule {}
