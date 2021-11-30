import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageTorunamentComponent } from "./manage-torunament/manage-torunament.component";
import { ManageTournamentsComponent } from "./manage-tournaments.component";

const routes: Routes = [
    {
        path: ``,
        component: ManageTournamentsComponent
    },
    {
        path: `:id`,
        component: ManageTorunamentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageTournamentsRoutingModule {}
