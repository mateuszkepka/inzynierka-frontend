import { RouterModule, Routes } from "@angular/router";

import { CreateTeamComponent } from "./create-team.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: ``,
        component: CreateTeamComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreateTeamRoutingModule { }
