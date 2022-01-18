import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "src/app/guards/auth.guard";
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
        canActivate: [AuthGuard],
        component: MatchResolveComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MatchesRoutingModule {}
