import { RouterModule, Routes } from "@angular/router";

import { MatchesComponent } from "./matches.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: `:id`,
        component: MatchesComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MatchesRoutingModule {}
