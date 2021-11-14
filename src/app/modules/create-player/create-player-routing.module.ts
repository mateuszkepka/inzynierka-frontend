import { RouterModule, Routes } from "@angular/router";

import { CreatePlayerComponent } from "./create-player.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: ``,
        component: CreatePlayerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreatePlayerRoutingModule { }
