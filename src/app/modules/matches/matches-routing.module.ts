import { RouterModule, Routes } from "@angular/router";

import { MatchResolveComponent } from "./match-resolve/match-resolve.component";
import { MatchesComponent } from "./matches.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: `:id`,
        component: MatchesComponent,
    },
    {
        path: `:id/resolve`,
        component: MatchResolveComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MatchesRoutingModule {}
