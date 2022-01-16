import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { ResolveMatchesComponent } from "./resolve-matches.component";

const routes: Routes = [
    {
        path: ``,
        component: ResolveMatchesComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResolveMatchesRoutingModule {}
